let selectedContentType = 'push'; // Default value
// function toggleSegmentOption() {
//     const aiSegmentFields = document.getElementById('aiSegmentFields');
//     const customSegmentField = document.getElementById('customSegmentField');
//     const segmentAI = document.getElementById('segmentAI').checked;

//     if (segmentAI) {
//         aiSegmentFields.style.display = 'block';
//         customSegmentField.style.display = 'none';
//     } else {
//         aiSegmentFields.style.display = 'none';
//         customSegmentField.style.display = 'block';
//     }
    // Show or hide the predefined prompt generation and segments based on user option
    // if (document.getElementById('segmentAI').checked) {
    //     document.getElementById('generatePredefinedButton').style.display = 'block';
    //     document.getElementById('aiSegmentFields').style.display = 'block';
    // } else {
    //     document.getElementById('generatePredefinedButton').style.display = 'none';
    //     document.getElementById('aiSegmentFields').style.display = 'none';
    // }
// }

function toggleTemplateOption() {
    const newTemplateField = document.getElementById('newTemplateField');
    const predefinedTemplateField = document.getElementById('predefinedTemplateField');
    const generateButton = document.getElementById('generateSegmentButton');
    const newTemplate = document.getElementById('newTemplate').checked;

    if (newTemplate) {
        newTemplateField.style.display = 'block';
        predefinedTemplateField.style.display = 'none';
        generateButton.style.display = 'block';
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

// Function to toggle between one-time and periodic campaign types
function toggleCampaignType() {
    const oneTimeOptions = document.getElementById('oneTimeOptions');
    const periodicOptions = document.getElementById('periodicOptions');
    const campaignType = document.querySelector('input[name="campaignType"]:checked').value;

    if (campaignType === 'oneTime') {
        oneTimeOptions.style.display = 'block';
        periodicOptions.style.display = 'none';
    } else if (campaignType === 'periodic') {
        oneTimeOptions.style.display = 'none';
        periodicOptions.style.display = 'block';
    }
}

// Function to toggle date and time options for one-time scheduling
function toggleOneTimeSchedule() {
    const oneTimeFixedOptions = document.getElementById('oneTimeFixedOptions');
    const bestTimeLink = document.getElementById('bestTimeLink');
    const scheduleType = document.querySelector('input[name="scheduleType"]:checked').value;

    if (scheduleType === 'fixedTime') {
        oneTimeFixedOptions.style.display = 'block';
        bestTimeLink.style.display = 'none';
    } else if (scheduleType === 'bestTime') {
        oneTimeFixedOptions.style.display = 'none';
        bestTimeLink.style.display = 'block';
    }
}

// Function to toggle date and time options for periodic scheduling (daily/weekly)
function togglePeriodicSchedule() {
    const periodicScheduleType = document.querySelector('input[name="periodicScheduleType"]:checked').value;
    const periodicFixedOptions = document.getElementById('periodicFixedOptions');
    const bestTimePeriodicLink = document.getElementById('bestTimePeriodicLink');
    
    if (periodicScheduleType === 'fixedTime') {
        periodicFixedOptions.style.display = 'block';
        bestTimePeriodicLink.style.display = 'none';
    } else if (periodicScheduleType === 'bestTime') {
        periodicFixedOptions.style.display = 'none';
        bestTimePeriodicLink.style.display = 'block';
    }
}

// Function to toggle between daily and weekly options
function toggleDailyOrWeekly() {
    const periodicType = document.querySelector('input[name="periodicType"]:checked').value;
    const dailyOptions = document.getElementById('dailyOptions');
    const weeklyOptions = document.getElementById('weeklyOptions');

    if (periodicType === 'daily') {
        dailyOptions.style.display = 'block';
        weeklyOptions.style.display = 'none';
    } else if (periodicType === 'weekly') {
        dailyOptions.style.display = 'none';
        weeklyOptions.style.display = 'block';
    }
}

// Function to toggle periodic schedule options only after selecting daily or weekly
function togglePeriodicType() {
    const periodicTimeOptions = document.getElementById('periodicTimeOptions');
    const dailyOptions = document.getElementById('dailyOptions');
    const weeklyOptions = document.getElementById('weeklyOptions');
    const periodicType = document.querySelector('input[name="periodicType"]:checked').value;

    if (periodicType === 'daily') {
        periodicTimeOptions.style.display = 'block';
        dailyOptions.style.display = 'block';
        weeklyOptions.style.display = 'none';
    } else if (periodicType === 'weekly') {
        periodicTimeOptions.style.display = 'block';
        dailyOptions.style.display = 'none';
        weeklyOptions.style.display = 'block';
    } else {
        periodicTimeOptions.style.display = 'none';
    }
}

// Function to toggle between fixed time and best time for periodic campaigns
function togglePeriodicSchedule() {
    const periodicScheduleType = document.querySelector('input[name="periodicScheduleType"]:checked').value;
    const periodicFixedOptions = document.getElementById('periodicFixedOptions');
    const bestTimePeriodicLink = document.getElementById('bestTimePeriodicLink');
    
    if (periodicScheduleType === 'fixedTime') {
        periodicFixedOptions.style.display = 'block';
        bestTimePeriodicLink.style.display = 'none';
    } else if (periodicScheduleType === 'bestTime') {
        periodicFixedOptions.style.display = 'none';
        bestTimePeriodicLink.style.display = 'block';
    }
}

function sendCampaign() {
    alert('Campaign sent successfully!');
    window.location.href = '/analytics';  // URL path for Flask routing
}

// Sample data for the table, including create date
const campaignData = [
    { name: 'Campaign 1', channel: 'push', status: 'active', variant: 'A/B', distribution: '50/50', ctr: 5, sent: 1000, clicked: 50, ignored: 950, unsubscribe: 10, performance: 50, createDate: '2023-09-01' },
    { name: 'Campaign 2', channel: 'email', status: 'scheduled', variant: 'Control', distribution: '100%', ctr: 10, sent: 1500, clicked: 150, ignored: 1350, unsubscribe: 20, performance: 65, createDate: '2023-08-15' },
    { name: 'Campaign 3', channel: 'push', status: 'drafts', variant: 'A/B', distribution: '70/30', ctr: 7, sent: 500, clicked: 35, ignored: 465, unsubscribe: 5, performance: 30, createDate: '2023-09-20' },
];

// Function to render the table based on filtered data
function renderTable(data) {
    const tableBody = document.getElementById('campaignTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear current table data

    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.name}</td>
            <td>${row.channel}</td>
            <td>${row.status}</td>
            <td>${row.variant}</td>
            <td>${row.distribution}</td>
            <td>${row.ctr}</td>
            <td>${row.sent}</td>
            <td>${row.clicked}</td>
            <td>${row.ignored}</td>
            <td>${row.unsubscribe}</td>
            <td>${row.performance}</td>
            <td>${row.createDate}</td> <!-- Added Create Date -->
        `;
        tableBody.appendChild(tr);
    });
}

// Function to apply filters and sorting
function applyFilters() {
    let filteredData = campaignData;

    // Get filter values
    const channel = document.getElementById('channel').value;
    const campaignName = document.getElementById('campaignName').value.toLowerCase();
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    const status = document.getElementById('status').value;
    const sortBy = document.getElementById('sortBy').value;

    // Apply channel and status filters
    if (channel !== 'all') {
        filteredData = filteredData.filter(campaign => campaign.channel === channel);
    }
    if (campaignName) {
        filteredData = filteredData.filter(campaign => campaign.name.toLowerCase().includes(campaignName));
    }
    if (status !== 'all') {
        filteredData = filteredData.filter(campaign => campaign.status === status);
    }

    // Filter based on create date
    if (dateFrom) {
        filteredData = filteredData.filter(campaign => new Date(campaign.createDate) >= new Date(dateFrom));
    }
    if (dateTo) {
        filteredData = filteredData.filter(campaign => new Date(campaign.createDate) <= new Date(dateTo));
    }

    // Apply sorting
    filteredData.sort((a, b) => {
        if (sortBy === 'createDate') {
            return new Date(b.createDate) - new Date(a.createDate); // Sort by create date
        }
        return b[sortBy] - a[sortBy]; // Other sorting options (CTR, Sent, Clicked, etc.)
    });

    // Render the filtered and sorted data in the table
    renderTable(filteredData);
}

// Function to download the table data as an Excel file
function downloadExcel() {
    let table = document.getElementById('campaignTable');
    let rows = [...table.rows];

    let csvContent = "data:text/csv;charset=utf-8,";
    rows.forEach(row => {
        let rowData = [...row.cells].map(cell => cell.textContent).join(",");
        csvContent += rowData + "\r\n";
    });

    // Create a download link and trigger the download
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', encodeURI(csvContent));
    downloadLink.setAttribute('download', 'campaign_analytics.csv');
    downloadLink.click();
}

// Initial table render
document.addEventListener('DOMContentLoaded', () => {
    renderTable(campaignData); // Render table with initial data
});

function toggleSegmentOption() {
    const aiSegmentFields = document.getElementById('aiSegmentFields');
    const customSegmentField = document.getElementById('customSegmentField');
   
    if (document.getElementById('segmentAI').checked) {
        aiSegmentFields.style.display = 'block';
        customSegmentField.style.display = 'none';
    } else {
        aiSegmentFields.style.display = 'none';
        customSegmentField.style.display = 'block';
    }
 }
 
 
//  function toggleTemplateOption() {
//     const predefinedTemplateField = document.getElementById('predefinedTemplateField');
//     const newTemplateField = document.getElementById('newTemplateField');
//     const generateButton = document.getElementById('generateButton');
//     const segmentContainer = document.getElementById('segmentContainer');
//     const regenerateButton = document.getElementById('regenerateButton');
   
//     segmentContainer.style.display = 'none';
//     regenerateButton.style.display = 'none';
//     generateButton.style.display = 'block'; // Show generate button
 
    
//     // if (document.getElementById('predefinedTemplate').checked) {
//     //     predefinedTemplateField.style.display = 'block';
//     //     newTemplateField.style.display = 'none';
//     //     templateType = 'predefined';
//     // } else {
//         predefinedTemplateField.style.display = 'none';
//         newTemplateField.style.display = 'block';
//         templateType = 'new';
//     // }
//  }
 
 
//  function generateSegment() {
//     const segmentContainer = document.getElementById('segmentContainer');
//     const regenerateButton = document.getElementById('regenerateButton');
//     const generateButton = document.getElementById('generateButton');
   
//     // Show segment container and regenerate button after generating
//     segmentContainer.style.display = 'block';
//     regenerateButton.style.display = 'block';
//     generateButton.style.display = 'none'; // Hide the generate button after generation
//     selectSegment('Segment 1');  // Default to Segment 1
//  }
 
 
//  function selectSegment(segment) {
//     const editableSegment = document.getElementById('editableSegment');
//     editableSegment.value = segment;
//  }

function generateSegment() {
    // Capture form data
    const campaignName = document.getElementById('campaignName').value;
    const campaignGoal = document.getElementById('campaignGoal').value;

    // Prepare form data for POST request
    const formData = new FormData();
    formData.append('campaignName', campaignName);
    formData.append('campaignGoal', campaignGoal);

    // Send POST request to '/generate-prompt' to get the segments
    fetch('/generate-prompt', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Populate the segment fields with the AI-generated content
        // document.getElementById('segment1').value = data.segment_1;
        // document.getElementById('segment2').value = data.segment_2;
        // document.getElementById('segment3').value = data.segment_3;
        document.getElementById('segment1').innerText = data.segment_1;
        document.getElementById('segment2').innerText = data.segment_2;
        document.getElementById('segment3').innerText = data.segment_3;

        // Show the segment container after generating
        document.getElementById('segmentContainer').style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// function toggleSegmentOption() {
//     // Show or hide the generate button based on segment option selection
//     if (document.getElementById('segmentAI').checked) {
//         document.getElementById('generateButton').style.display = 'block';
//         document.getElementById('aiSegmentFields').style.display = 'block';
//     } else {
//         document.getElementById('generateButton').style.display = 'none';
//         document.getElementById('aiSegmentFields').style.display = 'none';
//     }
// }
 function selectTitle(title) {
    const editableTitle = document.getElementById('editableTitle');
    editableTitle.value = title;
 }


 function selectSubtitle(subtitle) {
    const editableSubtitle = document.getElementById('editableSubtitle');
    editableSubtitle.value = subtitle;
 }


 function selectPushmsg(pushmsg) {
    const editablePushmsg = document.getElementById('editablePushmsg');
    editablePushmsg.value = pushmsg;
 }


 function selectSubject(subject) {
    const editableSubject = document.getElementById('editableSubject');
    editableSubject.value = subject;
 }

 function selectBody(body) {
    const editableBody = document.getElementById('editableBody');
    editableBody.value = body;
 }
 
 function selectCTA(cta) {
    const editableCTA = document.getElementById('editableCTA');
    editableCTA.value = cta;
 }
 
 function regenerateSegment() {
    // Logic to regenerate the segment
    alert("Segment regenerated!");
 }

 function regenerateContent() {
    // Logic to regenerate the segment
    alert("Content regenerated!");
 }
 
 document.addEventListener('DOMContentLoaded', function () {
    const selectableImages = document.querySelectorAll('.selectable-image');
    const editableImage = document.getElementById('editableImage');
    const imageUpload = document.getElementById('imageUpload');

    // Function to handle image selection
    selectableImages.forEach(image => {
        image.addEventListener('click', function () {
            const imageUrl = image.getAttribute('data-image-url');
            editableImage.src = imageUrl;
        });
    });

    // Function to handle custom image upload
    imageUpload.addEventListener('change', function () {
        const file = imageUpload.files[0];
        const reader = new FileReader();
        
        reader.onload = function (e) {
            editableImage.src = e.target.result;
        };
        
        if (file) {
            reader.readAsDataURL(file);
        }
    });
});

// Submit Image Function (can be modified to perform actions)


function toggleTemplateContentOption(selectedOption) {
    const predefinedTemplateField = document.getElementById('predefinedTemplateContentField');
    const newTemplateField = document.getElementById('newTemplateContentField');
   
    if (selectedOption === 'predefined') {
        predefinedTemplateField.style.display = 'block';
        newTemplateField.style.display = 'none';
    } else if (selectedOption === 'new') {
        predefinedTemplateField.style.display = 'none';
        newTemplateField.style.display = 'block';
    }
 }
 
 
 // Initialize variant count functions
 function incrementVariantCount() {
    const variantCount = document.getElementById('variantCount');
    const currentValue = parseInt(variantCount.value, 10);
    if (currentValue < 5) {
        variantCount.value = currentValue + 1;
    }
 }
 
 
 function decrementVariantCount() {
    const variantCount = document.getElementById('variantCount');
    const currentValue = parseInt(variantCount.value, 10);
    if (currentValue > 1) {
        variantCount.value = currentValue - 1;
    }
 }

 function generatePredefinedPrompt() {
    // Capture form data
    const campaignName = document.getElementById('campaignName').value;
    const campaignGoal = document.getElementById('campaignGoal').value;

    // Prepare form data for POST request
    const formData = new FormData();
    formData.append('campaignName', campaignName);
    formData.append('campaignGoal', campaignGoal);

    // Send POST request to '/generate-predefined-prompt' to get the predefined prompt
    fetch('/generate-predefined-prompt', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Populate the predefined prompt field
        document.getElementById('predefinedPrompt').value = data.predefined_prompt;
        predefinedTemplateField.style.display = 'block';
        newTemplateField.style.display = 'none';
        // Show the generate segments button after predefined prompt is generated
        document.getElementById('generateSegmentButton').style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
    });
    // Collect form data from the target audience tab
    // const formData = new FormData();
    // formData.append('campaignName', document.getElementById('campaignName').value);
    // formData.append('campaignGoal', document.getElementById('campaignGoal').value);
    // formData.append('customerData', document.getElementById('customerData').files[0]);

    // // Fetch business details from the session via AJAX
    // fetch('/get_business_details', {
    //     method: 'GET',
    // })
    // .then(response => response.json())
    // .then(businessDetails => {
    //     // Append business details to the form data
    //     formData.append('businessName', businessDetails.business_name);
    //     formData.append('industry', businessDetails.industry);
    //     formData.append('businessDescription', businessDetails.business_description);
    //     formData.append('primaryColor', businessDetails.primary_color);
    //     formData.append('secondaryColor', businessDetails.secondary_color);
    //     formData.append('tertiaryColor', businessDetails.tertiary_color);
    //     formData.append('fontSize', businessDetails.font_size);
    //     formData.append('fontStyle', businessDetails.font_style);

    //     // Send the form data to the backend for AI prompt generation
    //     return fetch('/generate-prompt', {
    //         method: 'POST',
    //         body: formData,
    //     });
    // })
    // .then(response => response.json())
    // .then(data => {
    //     // Display the generated predefined prompt
    //     document.getElementById('predefinedPrompt').value = data.predefined_prompt;
    //     predefinedTemplateField.style.display = 'block';
    //     newTemplateField.style.display = 'none';
    //     document.getElementById("generateButton").style.display = 'inline-block';
    // })
    // .catch(error => console.error('Error:', error));
}

function generateSegments() {
    // Capture predefined prompt
    const newTemplate = document.getElementById('newTemplate').checked;
    const formData = new FormData();
    if (newTemplate) {
        const customPrompt = document.getElementById('customPrompt').value;
        formData.append('customPrompt', customPrompt);
    }
    else {  
        const predefinedPrompt = document.getElementById('predefinedPrompt').value;
        formData.append('predefinedPrompt', predefinedPrompt);

    // Prepare form data for POST request
    }

    // Send POST request to '/generate-segments' to get the segments
    fetch('/generate-segments', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Populate the segment fields with the AI-generated content
        document.getElementById('segment1').innerHTML = data.segment_1;
        document.getElementById('segment2').innerHTML = data.segment_2;
        document.getElementById('segment3').innerHTML = data.segment_3;

        // Show the segment container after generating
        document.getElementById('segmentContainer').style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function submitBusinessDetails() {
    const formData = new FormData();
    formData.append('businessName', document.getElementById('businessName').value);
    formData.append('industry', document.getElementById('industry').value);
    formData.append('otherIndustry', document.getElementById('otherIndustry').value);
    formData.append('businessDescription', document.getElementById('businessDescription').value);
    formData.append('businessLogo', document.getElementById('businessLogo').files[0]);
    formData.append('primaryColor', document.getElementById('primaryColor').value);
    formData.append('secondaryColor', document.getElementById('secondaryColor').value);
    formData.append('tertiaryColor', document.getElementById('tertiaryColor').value);
    formData.append('fontSize', document.getElementById('fontSize').value);
    formData.append('fontStyle', document.getElementById('fontStyle').value);

    fetch('/submit_business_details', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirect to the Target Audience tab
            nextTab('targetAudience');
        } else {
            alert('Error saving business details');
        }
    })
    .catch(error => console.error('Error:', error));
}
function selectSegment(segment) {
    segment = document.getElementById(segment).innerText;
    const editableSegment = document.getElementById('editableSegment');
    editableSegment.value = segment;
}

function generatePredefinedPromptContent() {
    // Capture form data
    const contentType = document.querySelector('input[name="contentChannel"]:checked').value;
    const contentObjective = document.getElementById('contentObjective').value;
    const tone = document.getElementById('tone').value;
    const campaignGoal = sessionStorage.getItem('campaignGoal'); // Assuming you store campaign goal in session storage
    // const businessDescription = sessionStorage.getItem('businessDescription'); // Assuming this comes from business details
    const targetSegment = sessionStorage.getItem('segment'); // Selected target segment

    const formData = new FormData();
    formData.append('contentType', contentType);
    formData.append('contentObjective', contentObjective);
    formData.append('tone', tone);
    formData.append('campaignGoal', campaignGoal);
    // formData.append('businessDescription', businessDescription);
    formData.append('targetSegment', targetSegment);

    // Send POST request to Flask
    fetch('/generate-predefined-content-prompt', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Populate the predefined prompt field with the AI-generated prompt
        document.getElementById('predefinedPromptContent').value = data.predefined_prompt;
    })
    .catch(error => {
        console.error('Error:', error);
    });
    toggleTemplateContentOption('predefined');
}

function saveTargetAudienceData() {
    // Get values from the Target Audience form
    let campaignName = document.getElementById('campaignName').value;
    let campaignGoal = document.getElementById('campaignGoal').value;
    let custom = document.getElementById('customSegment').checked;
    let segment = document.getElementById('editableSegment').value;
    if(custom){
    segment = document.getElementById('customSegment').value;
    }
    // Assuming the customerData is a file input, we handle it separately
    // let customerData = document.getElementById('customerData').files[0]; // File input
    
    // let templateOption = document.querySelector('input[name="templateOption"]:checked').value;
    
    // // If using predefined prompt
    // let predefinedPrompt = document.getElementById('predefinedPrompt').value;
    
    // // If using custom prompt (in case they choose to create a new template)
    // let customPrompt = document.getElementById('customPrompt').value;
    
    // Store the data in sessionStorage
    sessionStorage.setItem('campaignName', campaignName);
    sessionStorage.setItem('campaignGoal', campaignGoal);
    sessionStorage.setItem('segment',segment);
    
    // Store template choice and prompts
    // sessionStorage.setItem('templateOption', templateOption);
    // sessionStorage.setItem('predefinedPrompt', predefinedPrompt);
    // sessionStorage.setItem('customPrompt', customPrompt);
    
    // Navigate to the next tab (you might want to modify this depending on your setup)
    nextTab('contentIdeation');
}
