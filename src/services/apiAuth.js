import supabase, { supabaseUrl } from './supabase';

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // Update password OR fullName
  let updateData;

  //Remove this in real application to ensure password change is possible
  if (password) throw new Error('Password cannot be changed in demo application');

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // Upload avatar Image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage.from('avatars').upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: { avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}` },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}
