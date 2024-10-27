var _a;
var resumeData = {
    name: '',
    email: '',
    education: '',
    workExperience: '',
    skills: [],
    profileImage: ''
};
(_a = document.getElementById("resumeForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    var _a;
    event.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var education = document.getElementById("education").value;
    var workExperience = document.getElementById("workExperience").value;
    var skills = document.getElementById("skills").value.split(",").map(function (skill) { return skill.trim(); });
    var profileImageFile = (_a = document.getElementById("profileImage").files) === null || _a === void 0 ? void 0 : _a[0];
    if (profileImageFile) {
        var reader_1 = new FileReader();
        reader_1.onload = function () {
            resumeData.profileImage = reader_1.result;
            resumeData.name = name;
            resumeData.email = email;
            resumeData.education = education;
            resumeData.workExperience = workExperience;
            resumeData.skills = skills;
            displayResume();
        };
        reader_1.readAsDataURL(profileImageFile);
    }
    else {
        resumeData.name = name;
        resumeData.email = email;
        resumeData.education = education;
        resumeData.workExperience = workExperience;
        resumeData.skills = skills;
        displayResume();
    }
});
function displayResume() {
    var resumeOutput = document.getElementById("resumeOutput");
    if (resumeOutput) {
        resumeOutput.innerHTML = "\n      ".concat(resumeData.profileImage ? "\n        <div class=\"image-edit-container\">\n          <img src=\"".concat(resumeData.profileImage, "\" alt=\"Profile Image\" class=\"profile-image\" />\n          <button class=\"edit-btn\" onclick=\"editProfileImage()\">Edit Image</button>\n        </div>") : "", "\n      <h2 class=\"borderBottom\">Name: <span>").concat(resumeData.name, "</span> <button class=\"edit-btn\" onclick=\"editField('name')\">Edit</button></h2>\n      <h3 class=\"borderBottom\">Email: <span>").concat(resumeData.email, "</span> <button class=\"edit-btn\" onclick=\"editField('email')\">Edit</button></h3>\n      <h3 class=\"borderBottom\">Education: <span>").concat(resumeData.education, "</span> <button class=\"edit-btn\" onclick=\"editField('education')\">Edit</button></h3>\n      <h3 class=\"borderBottom\">Work Experience:<span>").concat(resumeData.workExperience, "</span> <button class=\"edit-btn\" onclick=\"editField('workExperience')\">Edit</button></h3>\n      <h3 class=\"borderBottom\">Skills: <ul>").concat(resumeData.skills.map(function (skill) { return "<li>".concat(skill, " <button class=\"edit-btn\" onclick=\"editSkill('").concat(skill, "')\">Edit</button></li>"); }).join(''), "</ul></h3>\n    ");
    }
}
function editProfileImage() {
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.addEventListener("change", function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader_2 = new FileReader();
            reader_2.onload = function () {
                resumeData.profileImage = reader_2.result;
                displayResume();
            };
            reader_2.readAsDataURL(file);
        }
    });
    // Trigger file input click to open the file selector dialog
    fileInput.click();
}
function editField(field) {
    var resumeOutput = document.getElementById("resumeOutput");
    if (!resumeOutput)
        return;
    var currentValue = resumeData[field];
    resumeOutput.innerHTML = "\n    ".concat(resumeData.profileImage ? "<img src=\"".concat(resumeData.profileImage, "\" alt=\"Profile Image\" class=\"profile-image\" />") : "", "\n    <h2>").concat(field === 'name' ? "Name:" : '', " <input type=\"text\" id=\"editField\" value=\"").concat(currentValue, "\" /> \n    <button class=\"edit-btn\" onclick=\"saveField('").concat(field, "')\">Save</button></h2>\n  ");
}
function saveField(field) {
    var newValue = document.getElementById("editField").value;
    resumeData[field] = newValue;
    displayResume();
}
function editSkill(skill) {
    var index = resumeData.skills.indexOf(skill);
    var newSkill = prompt("Edit Skill:", skill);
    if (newSkill && index > -1) {
        resumeData.skills[index] = newSkill;
        displayResume();
    }
}
