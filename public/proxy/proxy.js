let tlds = [];

// Read TLDs from tld.txt when the page loads
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Load the tlds synchronously during initialization (assuming Node.js-style environment)
        tlds = fs.readFileSync('tld.txt', 'utf-8')
            .split(/\\r?\\n/)
            .filter(Boolean);
    } catch (err) {
        console.error('Error reading tld.txt:', err);
    }
});

function go() {
    var input = document.getElementById('searchbar');
    if (input && input.value) {
        const value = input.value.trim();

        // Check if the URL starts with 'https://', if not, add it
        let formattedValue = value;
        if (formattedValue.startsWith('http://')) {
            formattedValue = 'https://' + formattedValue.slice(7);  // Convert 'http://' to 'https://'
        } else if (!formattedValue.startsWith('https://')) {
            formattedValue = 'https://' + formattedValue;  // Add 'https://' if it's missing
        }

        const hasTLD = tlds.some(tld => formattedValue.endsWith(`.${tld}`));

        if (hasTLD || formattedValue.includes('.')) {
            // Treat as domain and navigate
            window.location.href = '/main/' + formattedValue;
        } else {
            // Treat as Google search
            window.location.href = '/main/https://www.google.com/search?q=' + encodeURIComponent(value);
        }
    } else {
        alert('Please provide a link or search query.');
    }
}
