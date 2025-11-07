import bcrypt from 'bcryptjs';
import { supabaseAdmin, User, UserInsert } from '@/lib/supabase';

export interface IUser extends User {
  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toJSON(): any;
}

export class UserModel {
  // Create a new user
  static async create(userData: Omit<UserInsert, 'id' | 'created_at' | 'updated_at'>): Promise<IUser> {
    if (!supabaseAdmin) {
      throw new Error('Supabase admin client is not available');
    }
    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const { data, error } = await supabaseAdmin
      .from('users')
      .insert({
        ...userData,
        password: hashedPassword,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }

    return this.mapToIUser(data);
  }

  // Find user by email
  static async findByEmail(email: string, includePassword = false): Promise<IUser | null> {
    if (!supabaseAdmin) {
      throw new Error('Supabase admin client is not available');
    }
    const { data, error } = await supabaseAdmin
      .from('users')
      .select(includePassword ? '*' : 'id, name, email, role, status, last_login, wordpress_user_id, profile, created_at, updated_at')
      .eq('email', email.toLowerCase())
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return null;
      }
      throw new Error(`Failed to find user: ${error.message}`);
    }

    if (!data) {
      return null;
    }

    return this.mapToIUser(data as unknown as User);
  }

  // Find user by ID
  static async findById(id: string): Promise<IUser | null> {
    if (!supabaseAdmin) {
      throw new Error('Supabase admin client is not available');
    }
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('id, name, email, role, status, last_login, wordpress_user_id, profile, created_at, updated_at')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return null;
      }
      throw new Error(`Failed to find user: ${error.message}`);
    }

    if (!data) {
      return null;
    }

    return this.mapToIUser(data as unknown as User);
  }

  // Check if email exists
  static async emailExists(email: string): Promise<boolean> {
    if (!supabaseAdmin) {
      throw new Error('Supabase admin client is not available');
    }
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return false;
      }
      throw new Error(`Failed to check email: ${error.message}`);
    }

    return !!data;
  }


  // Map Supabase user to IUser with methods
  private static mapToIUser(user: User | Partial<User>): IUser {
    return {
      ...user,
      comparePassword: async function(candidatePassword: string): Promise<boolean> {
        if (!user.password) {
          throw new Error('Password not available for comparison');
        }
        return bcrypt.compare(candidatePassword, user.password);
      },
      toJSON: function() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    } as IUser;
  }
}

// Export default for backward compatibility
export default UserModel;
