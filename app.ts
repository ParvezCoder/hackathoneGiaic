interface ResumeData {
  name: string;
  email: string;
  education: string;
  workExperience: string;
  skills: string[];
  profileImage: string;
}

const resumeData: ResumeData = {
  name: '',
  email: '',
  education: '',
  workExperience: '',
  skills: [],
  profileImage: ''
};

document.getElementById("resumeForm")?.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const education = (document.getElementById("education") as HTMLTextAreaElement).value;
  const workExperience = (document.getElementById("workExperience") as HTMLTextAreaElement).value;
  const skills = (document.getElementById("skills") as HTMLTextAreaElement).value.split(",").map(skill => skill.trim());
  const profileImageFile = (document.getElementById("profileImage") as HTMLInputElement).files?.[0];

  if (profileImageFile) {
    const reader = new FileReader();
    reader.onload = function () {
      resumeData.profileImage = reader.result as string;
      resumeData.name = name;
      resumeData.email = email;
      resumeData.education = education;
      resumeData.workExperience = workExperience;
      resumeData.skills = skills;
      displayResume();
    };
    reader.readAsDataURL(profileImageFile);
  } else {
    resumeData.name = name;
    resumeData.email = email;
    resumeData.education = education;
    resumeData.workExperience = workExperience;
    resumeData.skills = skills;
    displayResume();
  }
});
function displayResume() {
  const resumeOutput = document.getElementById("resumeOutput");
  if (resumeOutput) {
    resumeOutput.innerHTML = `
      ${resumeData.profileImage ? `
        <div class="image-edit-container">
          <img src="${resumeData.profileImage}" alt="Profile Image" class="profile-image" />
          <button class="edit-btn" onclick="editProfileImage()">Edit Image</button>
        </div>` : ""}
      <h2 class="borderBottom">Name: <span>${resumeData.name}</span> <button class="edit-btn" onclick="editField('name')">Edit</button></h2>
      <h3 class="borderBottom">Email: <span>${resumeData.email}</span> <button class="edit-btn" onclick="editField('email')">Edit</button></h3>
      <h3 class="borderBottom">Education: <span>${resumeData.education}</span> <button class="edit-btn" onclick="editField('education')">Edit</button></h3>
      <h3 class="borderBottom">Work Experience:<span>${resumeData.workExperience}</span> <button class="edit-btn" onclick="editField('workExperience')">Edit</button></h3>
      <h3 class="borderBottom">Skills: <ul>${resumeData.skills.map(skill => `<li>${skill} <button class="edit-btn" onclick="editSkill('${skill}')">Edit</button></li>`).join('')}</ul></h3>
    `;
  }
}


function editProfileImage() {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";

  fileInput.addEventListener("change", function (event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        resumeData.profileImage = reader.result as string;
        displayResume();
      };
      reader.readAsDataURL(file);
    }
  });

  // Trigger file input click to open the file selector dialog
  fileInput.click();
}



function editField(field: keyof Omit<ResumeData, "skills">) {
  const resumeOutput = document.getElementById("resumeOutput");
  if (!resumeOutput) return;

  const currentValue = resumeData[field] as string;
  resumeOutput.innerHTML = `
    ${resumeData.profileImage ? `<img src="${resumeData.profileImage}" alt="Profile Image" class="profile-image" />` : ""}
    <h2>${field === 'name' ? `Name:` : ''} <input type="text" id="editField" value="${currentValue}" /> 
    <button class="edit-btn" onclick="saveField('${field}')">Save</button></h2>
  `;
}

function saveField(field: keyof Omit<ResumeData, "skills">) {
  const newValue = (document.getElementById("editField") as HTMLInputElement).value;
  resumeData[field] = newValue as any;
  displayResume();
}

function editSkill(skill: string) {
  const index = resumeData.skills.indexOf(skill);
  const newSkill = prompt("Edit Skill:", skill);
  if (newSkill && index > -1) {
    resumeData.skills[index] = newSkill;
    displayResume();
  }
}
