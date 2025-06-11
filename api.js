// GitHub Pages API Replacement
// Since GitHub Pages only serves static files, we'll use external services

class SquidGameAPI {
    constructor() {
        this.baseURL = 'https://api.github.com/repos/' + this.getRepoPath() + '/contents/data';
        this.token = localStorage.getItem('github_token'); // User needs to provide
    }
    
    getRepoPath() {
        // Extract repo path from current URL
        const hostname = window.location.hostname;
        if (hostname.includes('github.io')) {
            const parts = hostname.split('.');
            return parts[0] + '/' + parts[0] + '.github.io';
        }
        return 'username/username.github.io'; // fallback
    }
    
    async saveUserData(userId, data) {
        // Save to GitHub repository as JSON file
        const filename = `user_${userId}.json`;
        const content = btoa(JSON.stringify(data)); // base64 encode
        
        try {
            const response = await fetch(`${this.baseURL}/${filename}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${this.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `Update user data for ${userId}`,
                    content: content
                })
            });
            
            return response.ok;
        } catch (error) {
            console.error('Save error:', error);
            return false;
        }
    }
    
    async loadUserData(userId) {
        const filename = `user_${userId}.json`;
        
        try {
            const response = await fetch(`${this.baseURL}/${filename}`);
            if (response.ok) {
                const data = await response.json();
                return JSON.parse(atob(data.content)); // decode base64
            }
        } catch (error) {
            console.error('Load error:', error);
        }
        
        return null;
    }
}

// Alternative: Use external services
class ExternalAPI {
    constructor() {
        // Use services like JSONBin, Firebase, or Supabase
        this.baseURL = 'https://api.jsonbin.io/v3/b';
        this.apiKey = 'YOUR_JSONBIN_API_KEY'; // User needs to get this
    }
    
    async saveUserData(userId, data) {
        try {
            const response = await fetch(`${this.baseURL}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': this.apiKey
                },
                body: JSON.stringify(data)
            });
            
            return response.ok;
        } catch (error) {
            console.error('Save error:', error);
            return false;
        }
    }
    
    async loadUserData(userId) {
        try {
            const response = await fetch(`${this.baseURL}/${userId}/latest`, {
                headers: {
                    'X-Master-Key': this.apiKey
                }
            });
            
            if (response.ok) {
                const result = await response.json();
                return result.record;
            }
        } catch (error) {
            console.error('Load error:', error);
        }
        
        return null;
    }
}

// Export for use in main game
window.SquidGameAPI = SquidGameAPI;
window.ExternalAPI = ExternalAPI;
