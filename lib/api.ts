export const sendContactForm = async ({ formData }): Promise<Response> =>
    fetch('api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-type': 'application/json',
            Accept: 'application/json'
        }
    });
