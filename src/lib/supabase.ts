import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fungsi untuk ambil atau buat user berdasarkan wallet
export async function getOrCreateUser(wallet: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('wallet_address', wallet)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking user:', error.message);
    return null;
  }

  if (data) return data;

  const { data: createdUser, error: insertError } = await supabase
    .from('users')
    .insert({
      wallet_address: wallet,
      points: 0,
      energy: 200,
      last_energy_reset: new Date().toISOString(),
    })
    .select()
    .single();

  if (insertError) {
    console.error('Error creating user:', insertError.message);
    return null;
  }

  return createdUser;
}
