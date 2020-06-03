const selectForm = document.forms[0];
const testButton = document.querySelector("button");

testButton.addEventListener("click", () => {
    let data = {
        age: selectForm.elements["age"].value,

        relationship: selectForm.elements["relationship"].value,
        currentActivity: selectForm.elements["currentActivity"].value,
        travelFrequency: selectForm.elements["travelFrequency"].value,
        travelReason: selectForm.elements["travelReason"].value,
        planStrategy: selectForm.elements["planStrategy"].value,
        postStrategy: selectForm.elements["postStrategy"].value,
        desireAppFeature: selectForm.elements["desireAppFeature"].value,
        apps: selectForm.elements["apps"].value,
        painPoints: selectForm.elements["painPoints"].value,
    };
    console.log(data);
});
