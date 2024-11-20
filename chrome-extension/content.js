(() => {
    const extractEmail = () => {
        const mailtoLinks = Array.from(document.querySelectorAll('a[href^="mailto:"]'))
            .map(link => link.href.replace('mailto:', '').trim());
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const textEmails = document.body.innerText.match(emailRegex);

        return mailtoLinks.length > 0 ? mailtoLinks[0] : textEmails ? textEmails[0] : null;
    };

    const email = extractEmail();
    return email || null;
})();
