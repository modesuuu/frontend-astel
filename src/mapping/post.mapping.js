export function mapPostPayload(formData, mediaUrls) {
    return {
        title: formData.title,
        description: formData.description,
        portfolioType: formData.portfolioType,
        externalUrl: formData.externalUrl,
        mediaUrls,
    };
}

