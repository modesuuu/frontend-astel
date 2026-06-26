"use block";
"use client";
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";

// IMPORT SUB FORM COMPONENTS
import FormPhotoUpload from "@/components/profile/edit/FormPhotoUpload";
import FormBasicInfo from "@/components/profile/edit/FormBasicInfo";
import FormSkillSelect from "@/components/profile/edit/FormSkillSelect";
import FormSocialMedia from "@/components/profile/edit/FormSocialMedia";

const EditProfilePage = () => {

    const router = useRouter();

    const [form, setForm] = useState({
        fullName: "Andi",
        bio: "Frontend Developer yang suka ngulik modern UI slice seperti Astro, Tailwind, dan GSAP.",
        photo_profile_url: "",
        institusi: "Telkom DigiUp",
        skills: ["skill-1", "skill-2"], // ID skill yang terpilih
        socialMedia: [
            { platform: "github", url: "https://github.com" },
            { platform: "instagram", url: "https://instagram.com" }
        ],
    });

    // 2. MASTER DATA SKILL DUMMY (Menggantikan hook useSkills)
    const availableSkills = [
        { _id: "skill-1", name: "React" },
        { _id: "skill-2", name: "Tailwind CSS" },
        { _id: "skill-3", name: "GSAP" },
        { _id: "skill-4", name: "Next.js" },
        { _id: "skill-5", name: "Solidity" },
    ];

    const [updating, setUpdating] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // ── Handlers ───────────────────────────────────────────────────
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleToggleSkill = (id) => {
        setForm((prev) => ({
            ...prev,
            skills: prev.skills.includes(id)
                ? prev.skills.filter((s) => s !== id)
                : [...prev.skills, id],
        }));
    };

    const handleAddSocial = (newSocialItem) => {
        const exists = form.socialMedia.findIndex((s) => s.platform === newSocialItem.platform);
        if (exists !== -1) {
            const updated = [...form.socialMedia];
            updated[exists] = { ...newSocialItem };
            setForm((prev) => ({ ...prev, socialMedia: updated }));
        } else {
            setForm((prev) => ({ ...prev, socialMedia: [...prev.socialMedia, { ...newSocialItem }] }));
        }
    };

    const handleRemoveSocial = (platform) => {
        setForm((prev) => ({
            ...prev,
            socialMedia: prev.socialMedia.filter((s) => s.platform !== platform),
        }));
    };

    // Simulasi submit tanpa axios
    const handleSubmit = (e) => {
        e.preventDefault();
        setUpdating(true);

        // Ceritanya loading simpan data selama 800ms
        setTimeout(() => {
            setUpdating(false);
            setIsSuccess(true);
            console.log("Data Berhasil Disimpan Secara Lokal:", form);

            // Hilangkan banner sukses setelah 3 detik
            setTimeout(() => setIsSuccess(false), 1000);
        }, 800);

        router.push('/profile/me');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 transition-colors">
            <div className="max-w-2xl mx-auto">

                {/* Page Top Navigator Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
                            Edit Profile
                        </h1>
                        <p className="text-sm text-gray-400 mt-0.5">
                            Update your account portfolio information locally
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="text-sm font-medium text-gray-400 hover:text-primbg-primary flex items-center gap-1 transition-colors cursor-pointer"
                    >
                        <i className="bx bx-left-arrow-alt text-lg"></i> Back
                    </button>
                </div>

                {/* Global Feedback Notifications Banner */}
                {isSuccess && (
                    <div className="mb-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 px-4 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                        <i className="bx bx-check-circle text-lg"></i> ✓ Profile updated successfully locally!
                    </div>
                )}

                {/* FORM MAIN BODY */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    <FormPhotoUpload value={form.photo_profile_url} onChange={handleChange} />

                    <FormBasicInfo form={form} onChange={handleChange} />

                    <FormSkillSelect
                        selectedSkills={form.skills}
                        availableSkills={availableSkills}
                        loadingSkills={false}
                        toggleSkill={handleToggleSkill}
                    />

                    <FormSocialMedia
                        socialMediaList={form.socialMedia}
                        onAddSocial={handleAddSocial}
                        onRemoveSocial={handleRemoveSocial}
                    />

                    {/* Form Trigger Actions Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-900">
                        <button
                            type="button"
                            onClick={() => alert("Logout Simulation")}
                            className="text-sm font-semibold text-red-500 hover:text-red-700 cursor-pointer focus:outline-none"
                        >
                            Logout from Account
                        </button>
                        <button
                            type="submit"
                            disabled={updating}
                            className="px-6 py-2.5 rounded-full bg-primary hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold transition-all shadow-sm cursor-pointer"
                        >
                            {updating ? "Saving…" : "Save Changes"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditProfilePage