'use client'; // Required for using hooks in the client component
 
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
 
const LanguageSelector = () => {
    const router = useRouter();
    const [lang, setLang] = useState('en');
 
    useEffect(() => {
        const currentLang = window.location.pathname.startsWith('/ar') ? 'ar' : 'en';
        setLang(currentLang);
    }, []);
 
    const handleChange = (event) => {
        const selectedLang = event.target.value;
        const newPath = window.location.pathname.replace(/^\/(en|ar)/, `/${selectedLang}`);
        router.push(newPath);
    };
 
    return (
        <select value={lang} onChange={handleChange}>
            <option value="en">English</option>
            <option value="ar">Arabic</option>
        </select>
    );
};
 
export default LanguageSelector;