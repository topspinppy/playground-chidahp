// WordPress API configuration and utilities

const WORDPRESS_API_URL = 'https://api.playground.chidahp.com/wp-json/chidahp-affiliate/v1/register';
const WORDPRESS_API_TOKEN = '5ffe5730-25e6-40d3-903e-0dbba87d28a0';

export interface WordPressUserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface WordPressResponse {
  success: boolean;
  message?: string;
  user_id?: number;
  username?: string;
  email?: string;
  role?: string;
  display_name?: string;
}

/**
 * Sync user to WordPress via API
 * @param userData - User data to sync
 * @returns Promise<WordPressResponse>
 */
export async function syncUserToWordPress(userData: WordPressUserData): Promise<WordPressResponse> {
  try {
    console.log('Syncing user to WordPress:', { email: userData.email, role: userData.role });
    
    const response = await fetch(WORDPRESS_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WORDPRESS_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userData.email, // Use email as username
        email: userData.email,
        password: userData.password,
        role: mapRoleToWordPress(userData.role), // Use the mapping function
        first_name: userData.name.split(' ')[0] || userData.name,
        last_name: userData.name.split(' ').slice(1).join(' ') || ''
      }),
    });

    console.log('WordPress API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('WordPress API error response:', errorData);
      throw new Error(`WordPress API error: ${response.status} - ${errorData.message || response.statusText}`);
    }

    const result = await response.json();
    console.log('WordPress API success response:', result);
    
    return {
      success: true,
      ...result
    };
  } catch (error) {
    console.error('WordPress sync error:', error);
    throw error;
  }
}

/**
 * Generate WordPress username from display name
 * @param name - Display name
 * @returns WordPress-compatible username
 */
export function generateWordPressUsername(name: string): string {
  return name
    .toLowerCase()
    .replaceAll(/\s+/g, '') // Remove all spaces
    .replaceAll(/[^a-z0-9]/g, ''); // Remove special characters, keep only alphanumeric
}

/**
 * Map internal role to WordPress role
 * @param role - Internal role
 * @returns WordPress role
 */
export function mapRoleToWordPress(role: string): string {
  const roleMap: Record<string, string> = {
    'writer': 'contributor',
    'admin': 'administrator',
    'editor': 'editor',
    'author': 'author',
    'subscriber': 'subscriber'
  };
  
  return roleMap[role] || 'contributor';
}
