import React, { useState } from 'react';
import axios from 'axios';
import uploadIcon from "../assets/images/upload-icon.png"
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Home = () => {
    // const BE_URL = "https://ai-powered-resume-scanner.onrender.com"
    const BE_URL = "http://localhost:5000"

    const [jobDescription, setJobDescription] = useState<string>('');
    const [resumes, setResumes] = useState<FileList | null>(null);
    const [results, setResults] = useState<any[]>([]);

    const [loading, setLoading] = useState(false);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setResumes(event.target.files);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true)
        if (!resumes || !jobDescription) {
            setLoading(false)
            toast.error("Please provide both job description and resumes.")
            return;
        }

        const formData = new FormData();
        formData.append('jobDescription', jobDescription);
        Array.from(resumes).forEach((file) => {
            formData.append('resumes', file);
        });

        try {
            const response = await axios.post(`${BE_URL}/analyze-resumes`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setResults(response.data.resumes);
            setLoading(false)
            toast.success("Success.")
        } catch (error) {
            toast.error("Error uploading resumes.")
            setLoading(false)
        }
    };

    if(loading) {
        return <Loader/>
    }

    return (
        <div id='page1' className="w-full p-6 sm:p-12 bg-[#EDF6FE] font-inter flex flex-col items-center gap-10">
            <form onSubmit={handleSubmit} className='w-full p-4 sm:p-10 border-[1px] border-black rounded-xl flex flex-col items-center'>
                <div className='w-full flex flex-col md:flex-row justify-between  gap-12'>
                    <div className='flex flex-col'>
                        <label className='text-[1.5rem] sm:text-[2rem] italic pb-2'>Job Description:</label>
                        <textarea
                            className='md:w-[300px] lg:w-[500px] xl:w-[760px] h-[300px] !outline-none p-4 rounded-md bg-[#BFE3E8]'
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            required
                            placeholder='Enter job description here...'
                        ></textarea>
                    </div>
                    <div className='min-w-[250px] lg:min-w-[300px] flex flex-col'>
                        <label className='text-[1.5rem] sm:text-[2rem] italic pb-2'>Upload Resumes:</label>
                        <label
                            className="cursor-pointer px-4 py-1 mb-4 bg-[#BFE3E8] flex items-center justify-center rounded-full"
                        >
                            <img src={uploadIcon} alt="upload" className='w-[2.5rem]' />
                            <input type="file" multiple onChange={handleFileChange} className="hidden" />
                        </label>

                        <div>
                            {resumes && resumes.length > 0 ? (
                                <ul>
                                    {Array.from(resumes).map((resume, index) => (
                                        <SelectedFileCompoment key={index} fileName={resume.name} slNo={index} />
                                    ))}

                                </ul>

                            ) : (
                                <p className="text-sm">No files selected</p>
                            )}
                        </div>
                    </div>
                </div>
                <button type="submit" className='mt-8 w-fit px-6 py-2 bg-gradient-to-r from-[#BFE3E8] to-[#6BC4D0] text-black text-[1.2rem] sm:text-[1.5rem] font-yeseva rounded-full'>Analyze</button>
            </form>

            <div className='w-full p-4 sm:p-10 border-[1px] border-black rounded-xl'>
                <h2 className='text-[1.5rem] sm:text-[2rem] italic pb-2'>Results</h2>
                <ul>
                    {results.map((result) => (
                        // send email (result.email) and onlcick to the component which will send an email to /send-email endpoint
                        <ResultComponent key={result.id} fileName={result.name} percentage={result.score.toFixed(2)} email={result.email}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}

function SelectedFileCompoment({ fileName, slNo }: { fileName: string, slNo: number }) {
    return (
        <div className='lg:max-w-[300px] bg-[#BFE3E8] px-4 p-2 rounded-md overflow-hidden flex items-center gap-4 mb-2'>
            <h2>{slNo + 1}{"."}</h2>
            <h2>{fileName}</h2>
        </div>
    )
}

function ResultComponent({ fileName, percentage, email }: { fileName: string, percentage: number, email:string }) {
    const [loading, setLoading] = useState(false);
    // const BE_URL = "https://ai-powered-resume-scanner.onrender.com"
    const BE_URL = "http://localhost:5000"

    async function sendEmailHandler() {  
        
        try {
            setLoading(true);
            const response = await axios.post(`${BE_URL}/send-email`, {
                email,
            });
    
            if(response) {
                toast.success("Email sent successfully");
            }
            setLoading(false);
        } catch(e) {
            toast.error("Failed to send email. Please try again");
            setLoading(false);
        }
    }

    if(loading) {
        return <Loader/>
    }

    return (
        <div className='sm:w-fit bg-[#BFE3E8] px-4 p-2 rounded-md flex items-center justify-between gap-4 mb-2'>
            <h2>{fileName}</h2>
            <h2 className='font-bold'>{percentage}{"%"}</h2>
            <button onClick={sendEmailHandler} className='bg-green-500 py-1 px-3 rounded-full ml-2 font-semibold'>Send Email</button>
        </div>
    )
}

export default Home