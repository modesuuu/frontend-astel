import React, { useRef } from 'react'

const FormPhotoUpload = ({ value, onChange }) => {

    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Membaca file gambar lokal untuk dijadikan preview string (Base64)
        const reader = new FileReader();
        reader.onloadend = () => {
            // Mengirimkan data string Base64 ke state form utama melalui handler onChange buatan
            onChange({
                target: {
                    name: 'photo_profile_url',
                    value: reader.result // Ini berisi string data:image/...
                }
            });
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <h2 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-4">
                Profile Photo
            </h2>

            <div className="flex flex-col sm:flex-row items-center gap-5">
                {/* Avatar Preview Box */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-500/20 bg-gray-50 dark:bg-gray-800 relative shrink-0 shadow-inner group">
                    <img
                        src={value || "/images/default-avatar.png"}
                        alt="Profile photo preview"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                            e.target.src = "/images/default-avatar.png";
                        }}
                    />
                </div>

                {/* Action Controls */}
                <div className="flex-1 w-full text-center sm:text-left space-y-2">
                    <label className="block text-xs font-medium text-gray-400 dark:text-gray-500 tracking-wider">
                        UPLOAD NEW PHOTO
                    </label>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        {/* Hidden Native Input File */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />

                        {/* Custom Styled Button for File Upload */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className=" items-center px-4 py-2 rounded-xl bg-primary hover:bg-indigo-700 text-white text-xs font-medium shadow-sm transition-colors cursor-pointer"
                        >

                            Choose Image File
                        </button>

                        {value && (
                            <button
                                type="button"
                                onClick={() => onChange({ target: { name: 'photo_profile_url', value: '' } })}
                                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-red-50 dark:bg-gray-800 dark:hover:bg-red-950/30 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 text-xs font-medium transition-colors cursor-pointer"
                            >
                                Remove
                            </button>
                        )}
                    </div>

                    <p className="text-[11px] text-gray-400 dark:text-gray-500">
                        Supports JPG, PNG, or WebM files (Max. 2MB).
                    </p>
                </div>
            </div>
        </div>
    )
}

export default FormPhotoUpload