let selectedContentType = 'push'; // Default value
function toggleSegmentOption() {
    const aiSegmentFields = document.getElementById('aiSegmentFields');
    const customSegmentField = document.getElementById('customSegmentField');
    const segmentAI = document.getElementById('segmentAI').checked;

    if (segmentAI) {
        aiSegmentFields.style.display = 'block';
        customSegmentField.style.display = 'none';
    } else {
        aiSegmentFields.style.display = 'none';
        customSegmentField.style.display = 'block';
    }
}

function toggleTemplateOption() {
    const newTemplateField = document.getElementById('newTemplateField');
    const newTemplate = document.getElementById('newTemplate').checked;

    if (newTemplate) {
        newTemplateField.style.display = 'block';
    } else {
        newTemplateField.style.display = 'none';
    }
}

function saveContentType(contentType) {
        sessionStorage.setItem('contentType', contentType);
    }

    function toggleTemplateContentOption() {
        const newTemplateContentField = document.getElementById('newTemplateContentField');
        const newTemplateContent = document.getElementById('newTemplateContent').checked;

        if (newTemplateContent) {
            newTemplateContentField.style.display = 'block';
        } else {
            newTemplateContentField.style.display = 'none';
        }
    }

    function incrementVariantCount() {
        const variantInput = document.getElementById('variantCount');
        if (parseInt(variantInput.value) < 5) {
            variantInput.value = parseInt(variantInput.value) + 1;
        }
    }

    function decrementVariantCount() {
        const variantInput = document.getElementById('variantCount');
        if (parseInt(variantInput.value) > 1) {
            variantInput.value = parseInt(variantInput.value) - 1;
        }
    }

    function generateContent() {
        alert('Generating content...');
        // Add logic for generating content based on inputs
    }


    function saveContentType(contentType) {
        sessionStorage.setItem('contentType', contentType);
    }

    function toggleTemplateContentOption() {
        const newTemplateContentField = document.getElementById('newTemplateContentField');
        const newTemplateContent = document.getElementById('newTemplateContent').checked;

        if (newTemplateContent) {
            newTemplateContentField.style.display = 'block';
        } else {
            newTemplateContentField.style.display = 'none';
        }
    }

    function incrementVariantCount() {
        const variantInput = document.getElementById('variantCount');
        if (parseInt(variantInput.value) < 5) {
            variantInput.value = parseInt(variantInput.value) + 1;
        }
    }

    function decrementVariantCount() {
        const variantInput = document.getElementById('variantCount');
        if (parseInt(variantInput.value) > 1) {
            variantInput.value = parseInt(variantInput.value) - 1;
        }
    }

    function generateContent() {
        alert('Generating content...');
        // Add logic for generating content based on inputs
    }

    function previousTab(prevTabId) {
        showTab(prevTabId);
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Retrieve the saved content type from sessionStorage
        const contentType = sessionStorage.getItem('contentType');

        // Show appropriate fields based on the saved content type
        if (contentType === 'pushNotification') {
            document.getElementById('pushNotificationFields').style.display = 'block';
        } else if (contentType === 'email') {
            document.getElementById('emailFields').style.display = 'block';
        }
    });

    function enableEditing() {
        const contentType = sessionStorage.getItem('contentType');

        if (contentType === 'pushNotification') {
            document.getElementById('title').disabled = false;
            document.getElementById('subtitle').disabled = false;
            document.getElementById('message').disabled = false;
            document.getElementById('imageInput').style.display = 'block';
            document.getElementById('imageInput').disabled = false;
        } else if (contentType === 'email') {
            document.getElementById('subject').disabled = false;
            document.getElementById('body').disabled = false;
            document.getElementById('cta').disabled = false;
            document.getElementById('imageInputEmail').style.display = 'block';
            document.getElementById('imageInputEmail').disabled = false;
        }

        document.getElementById('saveButton').disabled = false;
    }

    function saveChanges() {
        const contentType = sessionStorage.getItem('contentType');

        if (contentType === 'pushNotification') {
            document.getElementById('phoneTitle').textContent = document.getElementById('title').value;
            document.getElementById('phoneSubtitle').textContent = document.getElementById('subtitle').value;
            document.getElementById('phoneMessage').textContent = document.getElementById('message').value;

            // Handle image update for push notification
            const pushImageInput = document.getElementById('imageInput');
            if (pushImageInput.files.length > 0) {
                const imageUrl = URL.createObjectURL(pushImageInput.files[0]);
                document.getElementById('phoneImage').src = imageUrl;
            }
        } else if (contentType === 'email') {
            document.getElementById('phoneSubject').textContent = document.getElementById('subject').value;
            document.getElementById('phoneBody').textContent = document.getElementById('body').value;
            document.getElementById('phoneCTA').textContent = document.getElementById('cta').value;

            // Handle image update for email
            const emailImageInput = document.getElementById('imageInputEmail');
            if (emailImageInput.files.length > 0) {
                const imageUrl = URL.createObjectURL(emailImageInput.files[0]);
                document.getElementById('emailPhoneImage').src = imageUrl;
            }
        }

        alert('Changes saved and preview updated!');
    }

    function showTab(tabId) {
        const tabs = document.querySelectorAll('.tab-content');
        const tabButtons = document.querySelectorAll('.tab');
        
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });
    
        document.getElementById(tabId).classList.add('active');
        document.querySelector(`.tab[onclick="showTab('${tabId}')"]`).classList.add('active');
    }
    
    function getInTouch() {
        alert('Contact us at support@notifyai.com');
    }

    function nextTab(nextTabId) {
        if (nextTabId === 'contentGeneration'){
            showContentGeneration(selectedContentType);
        }
        showTab(nextTabId);
    }

    function toggleOtherIndustry() {
        const industrySelect = document.getElementById('industry');
        const otherIndustryInput = document.getElementById('otherIndustry');
        if (industrySelect.value === 'other') {
            otherIndustryInput.style.display = 'block';
        } else {
            otherIndustryInput.style.display = 'none';
        }
    }


function setContentType(type) {
    selectedContentType = type;
}

function showContentGeneration(type) {
    const isPush = type === 'push';
    document.getElementById('pushNotification').style.display = isPush ? 'block' : 'none';
    document.getElementById('email').style.display = isPush ? 'none' : 'block';
}

function editPushNotification() {
    document.getElementById('pushTitle').readOnly = false;
    document.getElementById('pushSubtitle').readOnly = false;
    document.getElementById('pushMessage').readOnly = false;
}

function savePushNotification() {
    document.getElementById('pushTitle').readOnly = true;
    document.getElementById('pushSubtitle').readOnly = true;
    document.getElementById('pushMessage').readOnly = true;
    // Update mobile preview here if needed
}

function editEmail() {
    document.getElementById('emailSubject').readOnly = false;
    document.getElementById('emailBody').readOnly = false;
    document.getElementById('emailCTA').readOnly = false;
}

function saveEmail() {
    document.getElementById('emailSubject').readOnly = true;
    document.getElementById('emailBody').readOnly = true;
    document.getElementById('emailCTA').readOnly = true;
    // Update mobile preview here if needed
}

function toggleCampaignType() {
    const campaignType = document.querySelector('input[name="campaignType"]:checked').value;
    const periodicOptions = document.getElementById('periodicOptions');
    const dateTimeOptions = document.getElementById('dateTimeOptions');

    if (campaignType === 'oneTime') {
        periodicOptions.style.display = 'none';
        dateTimeOptions.style.display = 'block';
        resetDateTimeFields();
    } else {
        periodicOptions.style.display = 'block';
        dateTimeOptions.style.display = 'none';
        resetDateTimeFields();
    }
}

function toggleDateTimeOption() {
    const dateTimeOption = document.querySelector('input[name="dateTimeOption"]:checked').value;
    const fixedTimeOptions = document.getElementById('fixedTimeOptions');
    const bestTimeOptions = document.getElementById('bestTimeOptions');

    if (dateTimeOption === 'scheduleLater') {
        fixedTimeOptions.style.display = 'block';
        bestTimeOptions.style.display = 'none';
    } else {
        fixedTimeOptions.style.display = 'none';
        bestTimeOptions.style.display = 'none';
    }
}

function toggleFixedTime() {
    const fixedTimeOption = document.querySelector('input[name="fixedTimeOption"]:checked').value;
    const timeField = document.getElementById('timeField');
    const dateField = document.getElementById('dateField');
    const timeZoneField = document.getElementById('timeZone');
    const viewBestTimeLink = document.getElementById('viewBestTime');

    if (fixedTimeOption === 'fixedTime') {
        dateField.style.display = 'block';
        timeField.style.display = 'block';
        timeZoneField.style.display = 'block';
        viewBestTimeLink.style.display = 'none';
    } else {
        dateField.style.display = 'none';
        timeField.style.display = 'none';
        timeZoneField.style.display = 'none';
        viewBestTimeLink.style.display = 'block';
    }
}

function resetDateTimeFields() {
    document.getElementById('dateField').value = '';
    document.getElementById('timeField').value = '';
    document.getElementById('timeZone').value = '';
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('input[name="campaignType"]').forEach(el => {
        el.addEventListener('change', toggleCampaignType);
    });

    document.querySelectorAll('input[name="dateTimeOption"]').forEach(el => {
        el.addEventListener('change', toggleDateTimeOption);
    });

    document.querySelectorAll('input[name="fixedTimeOption"]').forEach(el => {
        el.addEventListener('change', toggleFixedTime);
    });
});

