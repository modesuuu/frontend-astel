import React from 'react'
import PillLink from '../ui/Pillink.jsx';

const SocialMediaLinks = ({ links }) => {

    const defaultLinks = [
        // { platform: "Instagram", url: "https://instagram.com", icon: "bxl bx-instagram" },
        // { platform: "Linkedin", url: "https://linkedin.com", icon: "bxl bx-linkedin" },
        // { platform: "Github", url: "https://github.com", icon: "bxl bx-github" }
    ];

    const activeLinks = links || defaultLinks;

    return (
        <div className="flex flex-col gap-2 items-end">
            <span className="text-base font-medium text-secondary flex items-center gap-1">
                Sosial Media <i className="bx bx-link text"></i>
            </span>
            <div className="flex items-center gap-2 flex-wrap justify-end">
                {activeLinks.map((link, index) => (
                    // <a
                    //     key={index}
                    //     href={link.url}
                    //     target="_blank"
                    //     rel="noopener noreferrer"
                    //     className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D3CFFF] text-xs font-medium hover:bg-indigo-100 dark:hover:bg-indigo-950/80 transition-colors"
                    // >
                    //     <i className={`${link.icon} text-xl`}></i>
                    //     <span>{link.platform}</span>
                    // </a>
                    <PillLink key={index} href={link.url} platform={link.platform} external >
                        {link.platform}
                    </PillLink>
                ))}
            </div>
        </div>
    )
}

export default SocialMediaLinks