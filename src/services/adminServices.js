export async function updateAdminPassword(email, newPass) {
  try {
    const res = await window.electronAPI.updateAdminPassword(email, newPass);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserByName(name) {
  try {
    const res = await window.electronAPI.getAdminByName(name);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
