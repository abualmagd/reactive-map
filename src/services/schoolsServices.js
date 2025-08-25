export async function getAllSchools() {
  try {
    const res = await window.electronAPI.getAllSchools();
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createManySchools(manySchoolsData) {
  try {
    const res = await window.electronAPI.createManySchools(manySchoolsData);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createNewSchool(schoolsData) {
  try {
    const res = await window.electronAPI.createSchool(schoolsData);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateSchool(schoolsData) {
  try {
    const res = await window.electronAPI.updateSchool(schoolsData);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteSchool(id) {
  try {
    const res = await window.electronAPI.deleteSchool(id);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteAllSchools() {
  try {
    const res = await window.electronAPI.deleteAllSchool();
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
