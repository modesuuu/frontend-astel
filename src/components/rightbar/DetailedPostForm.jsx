"use block";
"use client";

import React, { useState, useRef } from 'react';

const DetailedPostForm = ({ isCollabMode, onClose }) => {

    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        title: '',
        link: '',           // Dipakai untuk Feed Post
        maxParticipants: '', // Dipakai untuk Collab
        description: '',
        skills: [],         // State ID Skill terpilih
        images: []
    });

    // Dummy Master Data Skills untuk Select Option
    const [availableSkills] = useState([
        { _id: "sk-1", name: "UI/UX" },
        { _id: "sk-2", name: "Frontend Developer" },
        { _id: "sk-3", name: "Backend Developer" },
        { _id: "sk-4", name: "React Native Expert" },
    ]);

    const toggleSkill = (skillId) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.includes(skillId)
                ? prev.skills.filter(id => id !== skillId)
                : [...prev.skills, skillId]
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const remainingSlots = 7 - formData.images.length;
        files.slice(0, remainingSlots).forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, images: [...prev.images, reader.result] }));
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("🚀 DISPATCH TO BACKEND API:", formData);
        alert('Form Berhasil Di-submit (Cek Console Log)');
        onClose();
    };

    return (
        <div className="w-full h-full flex flex-col">
            {/* Dynamic Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-950 dark:text-white">
                    {isCollabMode ? 'Make collaborations' : 'Post'}
                </h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl cursor-pointer">
                    <i className="bx bx-x"></i>
                </button>
            </div>

            {/* Form Card Area */}
            <form onSubmit={handleSubmit} className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-200/40 dark:border-gray-800 rounded-3xl p-5 flex flex-col gap-4 shadow-sm overflow-y-auto max-h-[78vh] custom-scrollbar">

                {/* Input Title */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 pl-1">Title</label>
                    <input
                        type="text" required placeholder="Title" value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-white dark:bg-gray-950 border border-transparent dark:border-gray-800 rounded-xl py-2.5 px-4 text-xs font-medium text-gray-950 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>

                {/* CONDITIONING INPUT FIELD KEDUA */}
                {!isCollabMode ? (
                    /* JIKA DI FEED PAGE */
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 pl-1">Link Project</label>
                        <input
                            type="url" placeholder="https://example.com" value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            className="w-full bg-white dark:bg-gray-950 border border-transparent dark:border-gray-800 rounded-xl py-2.5 px-4 text-xs font-medium text-gray-950 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>
                ) : (
                    /* JIKA DI COLLAB PAGE (Menampilkan Max Participants) */
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 pl-1">Max participants</label>
                        <input
                            type="number" placeholder="Add number" value={formData.maxParticipants}
                            onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                            className="w-full bg-white dark:bg-gray-950 border border-transparent dark:border-gray-800 rounded-xl py-2.5 px-4 text-xs font-medium text-gray-950 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>
                )}

                {/* CONDITIONING INPUT FIELD KETIGA (SKILLS FIELD DARI KODEMU) */}
                {isCollabMode && (
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 pl-1">Skill needed</label>
                        <select
                            value=""
                            onChange={(e) => {
                                if (e.target.value) toggleSkill(e.target.value);
                            }}
                            className="w-full text-xs rounded-xl border border-transparent dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-2.5 text-gray-500 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                        >
                            <option value="" disabled>None</option>
                            {availableSkills.map((skill) => (
                                <option key={skill._id} value={skill._id} disabled={formData.skills.includes(skill._id)}>
                                    {skill.name}
                                </option>
                            ))}
                        </select>

                        {/* Active Badge Lists */}
                        <div className="flex flex-wrap items-center gap-2 w-full pt-2">
                            {formData.skills.map((skillId) => {
                                const skill = availableSkills.find((item) => item._id === skillId);
                                return skill ? (
                                    <span
                                        key={skillId}
                                        className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100/50 dark:border-indigo-900/40 px-3 py-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 shadow-sm transition-all animate-fade-in"
                                    >
                                        <span>{skill.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => toggleSkill(skillId)}
                                            className="hover:text-red-500 font-extrabold text-sm transition-colors cursor-pointer focus:outline-none"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ) : null;
                            })}
                        </div>
                    </div>
                )}

                {/* Input Descriptions */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 pl-1">Descriptions</label>
                    <textarea
                        rows="4" placeholder="Deskripsi" required value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-white dark:bg-gray-950 border border-transparent dark:border-gray-800 rounded-xl py-2.5 px-4 text-xs font-medium text-gray-950 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    />
                </div>

                {/* Image Previews */}
                {formData.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                        {formData.images.map((imageSrc, index) => (
                            <div key={index} className="aspect-square bg-gray-950 rounded-xl border border-gray-800 overflow-hidden relative group">
                                <img src={imageSrc} alt="Preview" className="w-full h-full object-cover" />
                                <button type="button" onClick={() => setFormData(p => ({ ...p, images: p.images.filter((_, i) => i !== index) }))} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 text-lg cursor-pointer transition-opacity">
                                    <i className="bx bx-trash"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer controls */}
                <div className="flex items-center justify-between pt-1 mt-1">
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple accept="image/*" disabled={formData.images.length >= 7} className="hidden" />
                    <button type="button" onClick={() => fileInputRef.current.click()} disabled={formData.images.length >= 7} className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-800 dark:text-gray-200 hover:text-pribg-primary disabled:opacity-30 transition-colors cursor-pointer">
                        <i className="bx bx-folder text-base"></i> Upload files & image
                    </button>
                    <button type="submit" className="px-5 py-2 rounded-full bg-primary hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer active:scale-95">
                        Send
                    </button>
                </div>

            </form>
        </div>
    )
}

export default DetailedPostForm