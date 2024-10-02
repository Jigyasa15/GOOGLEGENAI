let campaignData = [];  // Store campaign data globally
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
        document.getElementById('generateSegmentButton').innerHTML = 'Generate Segment'
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

    // function generateContent() {
    //     alert('Generating content...');
    //     // Add logic for generating content based on inputs
    // }


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

    // function generateContent() {
    //     alert('Generating content...');
    //     // Add logic for generating content based on inputs
    // }

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
        alert('Contact us at ainotify80@gmail.com');
    }

    function nextTab(nextTabId) {
        if (nextTabId === 'contentGeneration'){
            showContentGeneration(selectedContentType);
            populateContentGenerationPage();
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

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname === '/analytics') {
        loadCampaignData();  // Load CSV data when on the analytics page
    }
});

function loadCampaignData() {
    fetch('/load-campaign-data')
        .then(response => response.json())
        .then(data => {
            campaignData = data;
            populateTable(data);
        })
        .catch(error => {
            console.error('Error loading campaign data:', error);
        });
}


    // Apply filters and sorting when the user clicks on the "Apply Filters" button


// Initial table render
// document.addEventListener('DOMContentLoaded', () => {
//     renderTable(campaignData); // Render table with initial data
// });

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

function populateTable(data) {
    const tableBody = document.querySelector('#campaignTable tbody');
    tableBody.innerHTML = '';  // Clear any existing rows


    data.forEach(row => {
        const rowElement = `
            <tr>
               <td style="text-align: center; margin-right: 20px; width: 10%;"">${row['Sent Date']}</td>
               <td style="text-align: center;">${row['Campaign Name']}</td>
               <td style="text-align: center;">${row['Status']}</td>
               <td style="text-align: center;">${row['Channel']}</td>
               <td style="text-align: center;">${row['User Segment']}</td>
               <td style="text-align: center;">${row['Delivered']}</td>
               <td style="text-align: center;">${row['Opened']}</td>
               <td style="text-align: center;">${row['Clicked']}</td>
               <td style="text-align: center;">${row['Unsubscribe Rate (%)']}</td>
               <td style="text-align: center;">${row['Open Rate (%)']}</td>
               <td style="text-align: center;">${row['CTR (%)']}</td>
               <td style="text-align: center;">${row['Avg. Open Time (min)']}</td>
               <td style="text-align: center;">${row['Avg. Click Time (min)']}</td>
           </tr>
           `;

        tableBody.innerHTML += rowElement;
    });
}

function applyFilters() {
    let filteredData = [...campaignData];  // Make a copy of the original data

    // Get filter values
    const channel = document.getElementById('channel').value;
    const campaignName = document.getElementById('campaignName').value.trim().toLowerCase();
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    const status = document.getElementById('status').value;

    // Filter by channel
    if (channel !== 'all') {
        filteredData = filteredData.filter(row => row['Channel'].toLowerCase() === channel.toLowerCase());
    }

    // Filter by campaign name (case-insensitive)
    if (campaignName) {
        filteredData = filteredData.filter(row => row['Campaign Name'].toLowerCase().includes(campaignName));
    }

    // Filter by status
    if (status !== 'all') {
        filteredData = filteredData.filter(row => row['Status'].toLowerCase() === status.toLowerCase());
    }

    // Filter by date range
    if (dateFrom) {
        filteredData = filteredData.filter(row => new Date(row['Sent Date']) >= new Date(dateFrom));
    }
    if (dateTo) {
        filteredData = filteredData.filter(row => new Date(row['Sent Date']) <= new Date(dateTo));
    }

    // Sort the filtered data by CTR or Open Rate
    const sortBy = document.getElementById('sortBy').value;
    if (sortBy === 'CTR') {
        filteredData.sort((a, b) => parseFloat(b['CTR (%)']) - parseFloat(a['CTR (%)']));
    } else if (sortBy === 'openRate') {
        filteredData.sort((a, b) => parseFloat(b['Open Rate (%)']) - parseFloat(a['Open Rate (%)']));
    }

    // Repopulate the table with the filtered and sorted data
    populateTable(filteredData);
}

// Download Excel file
// function downloadExcel() {
//     const channel = document.getElementById('channel').value;
//     const dateFrom = document.getElementById('dateFrom').value;
//     const dateTo = document.getElementById('dateTo').value;
//     const status = document.getElementById('status').value;
//     const sortBy = document.getElementById('sortBy').value;

//     const queryParams = new URLSearchParams({
//         channel: channel,
//         dateFrom: dateFrom,
//         dateTo: dateTo,
//         status: status,
//         sortBy: sortBy
//     });

//     window.location.href = `/download-excel?${queryParams}`;
// }

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
    // const editableTitle = document.getElementById('editableTitle');
    // editableTitle.value = title;
    document.getElementById('editableTitle').value = document.getElementById(title).innerText;
 }


 function selectSubtitle(subtitle) {
    // const editableSubtitle = document.getElementById('editableSubtitle');
    // editableSubtitle.value = subtitle;
    document.getElementById('editableSubtitle').value = document.getElementById(subtitle).innerText;
 }


 function selectPushmsg(pushmsg) {
    // const editablePushmsg = document.getElementById('editablePushmsg');
    // editablePushmsg.value = pushmsg;
    document.getElementById('editablePushmsg').value = document.getElementById(pushmsg).innerText;
 }


 function selectSubject(subject) {
    // const editableSubject = document.getElementById('editableSubject');
    // editableSubject.value = subject;
    document.getElementById('editableSubject').value = document.getElementById(subject).innerText;
 }

 function selectBody(body) {
    // console.log('Body selected:', body);  // For debugging
    document.getElementById('editableBody').value = document.getElementById(body).innerText;
    // const editableBody = document.getElementById('editableBody');
    // editableBody.value = body;
 }
 
 function selectCTA(cta) {
    // const editableCTA = document.getElementById('editableCTA');
    // editableCTA.value = cta;
    document.getElementById('editableCTA').value = document.getElementById(cta).innerText;
 }
 
 function regenerateSegment() {
    // Logic to regenerate the segment
    alert("Segment regenerated!");
 }

 function regenerateContent() {
    // Logic to regenerate the segment
    // alert("Content regenerated!");
    // const contentType = document.querySelector('input[name="contentChannel"]:checked').value;
    // let prompt = document.getElementById('customPromptContent').value;
    const contentType = sessionStorage.getItem('contentType');
    const prompt = sessionStorage.getItem('content_prompt')
    // const predefined = document.getElementById('predefinedTemplateContent').checked;
    // if (predefined) {
    //     prompt = document.getElementById('predefinedPromptContent').value;
    // }
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('contentType', contentType);

    fetch('/generate-content', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Store the response data in sessionStorage based on content type
            sessionStorage.setItem('generatedContentData', data);  // Store the response data
            populateContentGenerationPage();
        // Navigate to content generation tab and then populate data
        // nextTab('contentGeneration');
    })
    .catch(error => {
        console.error('Error:', error);
    });
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
        document.getElementById('generateSegmentButton').innerHTML = 'Generate Segment'
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
        document.getElementById('generateSegmentButton').innerHTML = 'Regenerate Segment'
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

// function generateContent() {
//     const contentType = document.querySelector('input[name="contentChannel"]:checked').value;
//     let prompt = document.getElementById('customPromptContent').value;

//     const predefined = document.getElementById('predefinedTemplateContent').checked;
//     if (predefined) {
//         prompt = document.getElementById('predefinedPromptContent').value;
//     }

//     const formData = new FormData();
//     formData.append('prompt', prompt);
//     formData.append('contentType', contentType);

//     fetch('/generate-content', {
//         method: 'POST',
//         body: formData,
//     })
//     .then(response => response.json())
//     .then(data => {
//         // Store the response data in sessionStorage based on content type
//         if (contentType === 'push') {
//             sessionStorage.setItem('generatedContentData', JSON.stringify(data));  // Store the response data
//         } else if (contentType === 'email') {
//             populateEmailContent(data);  // Call email-specific function
//         }

//         // Navigate to content generation tab and then populate data
//         nextTab('contentGeneration');
//         populateContentGenerationPage();  // Populate fields after navigating to the page
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }

// // Function to populate email content

// function populateContentGenerationPage() {
//     // Retrieve the generated content data from sessionStorage
//     const generatedData = JSON.parse(sessionStorage.getItem('generatedContentData'));

//     if (generatedData) {
//         // Populate Titles
//         document.getElementById('pushTitle').innerHTML = generatedData.title.map((title, index) => 
//             `<button class="segment-pill" onclick="selectTitle('${title}')">Title ${index + 1}</button>`
//         ).join('');

//         // Populate Subtitles
//         document.getElementById('pushSubtitle').innerHTML = generatedData.subtitle.map((subtitle, index) => 
//             `<button class="segment-pill" onclick="selectSubtitle('${subtitle}')">Subtitle ${index + 1}</button>`
//         ).join('');

//         // Populate Messages
//         document.getElementById('pushMessage').innerHTML = generatedData.message.map((message, index) => 
//             `<button class="segment-pill" onclick="selectPushmsg('${message}')">Message ${index + 1}</button>`
//         ).join('');
//     }
// }
function generateContent() {
    const contentType = document.querySelector('input[name="contentChannel"]:checked').value;
    let prompt = document.getElementById('customPromptContent').value;
    sessionStorage.setItem('contentType', contentType);
    const predefined = document.getElementById('predefinedTemplateContent').checked;
    if (predefined) {
        prompt = document.getElementById('predefinedPromptContent').value;
    }
    sessionStorage.setItem('content_prompt',prompt)
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('contentType', contentType);

    fetch('/generate-content', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Store the response data in sessionStorage based on content type
            sessionStorage.setItem('generatedContentData', data);  // Store the response data
        // Navigate to content generation tab and then populate data
        nextTab('contentGeneration');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to populate the generated content in the Content Generation Page
function populateContentGenerationPage() {
    // Retrieve the generated content data from sessionStorage
//     const contentType = document.querySelector('input[name="contentChannel"]:checked').value;
//     const data = sessionStorage.getItem('generatedContentData');
//     let cleanedData = data.replace(/`/g, ''); // This removes backticks
//     if (cleanedData.startsWith('json')) {
//         // Remove the prefix (if it exists)
//         cleanedData = cleanedData.substring(4).trim(); // Remove the first 4 characters
//     }
//     const generatedData = JSON.parse(cleanedData);
//     if (!generatedData) {
//         console.log('No data found in sessionStorage.');
//         return;
//     }

//     if(contentType == 'push'){
    
//     // Populate Titles
//     if (generatedData.Title && Array.isArray(generatedData.Title)) {
//         document.getElementById('pushTitle').innerHTML = generatedData.Title.map((title, index) => 
//             `<button class="segment-pill" id="title${index + 1}" onclick="selectTitle('title${index + 1}')">${title}</button>`
//         ).join('');
//     } else {
//         console.log('No title data found');
//     }

//     // Populate Subtitles
//     if (generatedData.Subtitle && Array.isArray(generatedData.Subtitle)) {
//         document.getElementById('pushSubtitle').innerHTML = generatedData.Subtitle.map((subtitle, index) => 
//             `<button class="segment-pill" id="subtitle${index + 1}" onclick="selectSubtitle('subtitle${index + 1}')">${subtitle}</button>`
//         ).join('');
//     } else {
//         console.log('No subtitle data found');
//     }

//     // Populate Messages
//     if (generatedData.Message && Array.isArray(generatedData.Message)) {
//         document.getElementById('pushMessage').innerHTML = generatedData.Message.map((message, index) => 
//             `<button class="segment-pill" id="message${index + 1}" onclick="selectPushmsg('message${index + 1}')">${message}</button>`
//         ).join('');
//     } else {
//         console.log('No message data found');
//     }
// }
// else{
//     // Populate Email Subjects
//     document.getElementById('Subject').innerHTML = generatedData.Subject.map((subject, index) => 
//         `<div class="segment-pill" id="subject${index + 1}" onclick="selectSubject('subject${index + 1}')">${subject}</div>`
//     ).join('');

//     // Populate Email Body
//     document.getElementById('Body').innerHTML = generatedData.Body.map((body, index) => 
//         `<div class="segment-pill" id="body${index + 1}" onclick="selectBody('body${index + 1}')">${body}</div>`
//     ).join('');

//     // Populate Email CTA
//     document.getElementById('CTA').innerHTML = generatedData.CTA.map((cta, index) => 
//         `<div class="segment-pill" id="CTA${index + 1}" onclick="selectCTA('CTA${index + 1}')">${cta}</div>`
//     ).join('');
// }

// Retrieve the generated content data from sessionStorage
const contentType = document.querySelector('input[name="contentChannel"]:checked').value;
const data = sessionStorage.getItem('generatedContentData');
let cleanedData = data.replace(/`/g, ''); // This removes backticks

if (cleanedData.startsWith('json')) {
    // Remove the prefix (if it exists)
    cleanedData = cleanedData.substring(4).trim(); // Remove the first 4 characters
}
const generatedData = JSON.parse(cleanedData);
if (!generatedData) {
    console.log('No data found in sessionStorage.');
    return;
}

if (contentType == 'push') {

    // Update Titles (without clearing the DOM)
    if (generatedData.Title && Array.isArray(generatedData.Title)) {
        generatedData.Title.forEach((title, index) => {
            let titleButton = document.getElementById(`title${index + 1}`);
            if (titleButton) {
                // If the button exists, update the text
                titleButton.innerHTML = title;
            } else {
                // If the button doesn't exist, create a new one
                const newButton = document.createElement('button');
                newButton.className = 'segment-pill';
                newButton.id = `title${index + 1}`;
                newButton.onclick = () => selectTitle(`title${index + 1}`);
                newButton.innerHTML = title;
                document.getElementById('pushTitle').appendChild(newButton);
            }
        });
    } else {
        console.log('No title data found');
    }

    // Update Subtitles (without clearing the DOM)
    if (generatedData.Subtitle && Array.isArray(generatedData.Subtitle)) {
        generatedData.Subtitle.forEach((subtitle, index) => {
            let subtitleButton = document.getElementById(`subtitle${index + 1}`);
            if (subtitleButton) {
                // Update existing button
                subtitleButton.innerHTML = subtitle;
            } else {
                // Create new button if not exists
                const newButton = document.createElement('button');
                newButton.className = 'segment-pill';
                newButton.id = `subtitle${index + 1}`;
                newButton.onclick = () => selectSubtitle(`subtitle${index + 1}`);
                newButton.innerHTML = subtitle;
                document.getElementById('pushSubtitle').appendChild(newButton);
            }
        });
    } else {
        console.log('No subtitle data found');
    }

    // Update Messages (without clearing the DOM)
    if (generatedData.Message && Array.isArray(generatedData.Message)) {
        generatedData.Message.forEach((message, index) => {
            let messageButton = document.getElementById(`message${index + 1}`);
            if (messageButton) {
                messageButton.innerHTML = message;
            } else {
                const newButton = document.createElement('button');
                newButton.className = 'segment-pill';
                newButton.id = `message${index + 1}`;
                newButton.onclick = () => selectPushmsg(`message${index + 1}`);
                newButton.innerHTML = message;
                document.getElementById('pushMessage').appendChild(newButton);
            }
        });
    } else {
        console.log('No message data found');
    }

} else {
    // Populate Email Subjects (without clearing the DOM)
    generatedData.Subject.forEach((subject, index) => {
        let subjectDiv = document.getElementById(`subject${index + 1}`);
        if (subjectDiv) {
            subjectDiv.innerHTML = subject;
        } else {
            const newDiv = document.createElement('div');
            newDiv.className = 'segment-pill';
            newDiv.id = `subject${index + 1}`;
            newDiv.onclick = () => selectSubject(`subject${index + 1}`);
            newDiv.innerHTML = subject;
            document.getElementById('Subject').appendChild(newDiv);
        }
    });

    // Populate Email Body (without clearing the DOM)
    generatedData.Body.forEach((body, index) => {
        let bodyDiv = document.getElementById(`body${index + 1}`);
        if (bodyDiv) {
            bodyDiv.innerHTML = body;
        } else {
            const newDiv = document.createElement('div');
            newDiv.className = 'segment-pill';
            newDiv.id = `body${index + 1}`;
            newDiv.onclick = () => selectBody(`body${index + 1}`);
            newDiv.innerHTML = body;
            document.getElementById('Body').appendChild(newDiv);
        }
    });

    // Populate Email CTA (without clearing the DOM)
    generatedData.CTA.forEach((cta, index) => {
        let ctaDiv = document.getElementById(`CTA${index + 1}`);
        if (ctaDiv) {
            ctaDiv.innerHTML = cta;
        } else {
            const newDiv = document.createElement('div');
            newDiv.className = 'segment-pill';
            newDiv.id = `CTA${index + 1}`;
            newDiv.onclick = () => selectCTA(`CTA${index + 1}`);
            newDiv.innerHTML = cta;
            document.getElementById('CTA').appendChild(newDiv);
        }
    });
}


}
function uploadCSV() {
    const fileInput = document.getElementById('customerData');
    const formData = new FormData();
    
    if (fileInput.files.length > 0) {
        formData.append('csv_file', fileInput.files[0]);
        
        // Send the file to the server via AJAX
        fetch('/upload-csv', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.file_path) {
                // Store the file path in sessionStorage for later use
                sessionStorage.setItem('uploadedCsvPath', data.file_path);
                console.log("CSV file uploaded successfully: " + data.file_path);
            } else {
                console.error("CSV upload failed");
            }
        })
        .catch(error => {
            console.error("Error uploading CSV:", error);
        });
    } else {
        console.error("No file selected for upload");
    }
}
function DeliveryInsights() {
    document.getElementById('deliveryInsightsPopup').style.display = 'block';
    document.getElementById('popupOverlay').style.display = 'block';
    
    // Retrieve the uploaded CSV file path from sessionStorage
    const uploadedCsvPath = sessionStorage.getItem('uploadedCsvPath');
    
    if (!uploadedCsvPath) {
        console.error('No CSV file found');
        return;
    }
    
    const contentType = sessionStorage.getItem('contentType'); // or get it from the form
    const formData = new FormData();
    formData.append('contentType', contentType);
    formData.append('csv_file_path', uploadedCsvPath);  // Send the file path to the backend

    fetch('/generate-timing', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        let best_timing = data.best_timing;
        best_timing = best_timing.replace(/[`*]/g, ''); // Remove unwanted characters
        document.getElementById('bestTimeAIContent').innerHTML = `
            <pre style="font-family: 'Arial', sans-serif; font-size: 16px; white-space: pre-wrap; word-wrap: break-word; width: 100%; overflow-wrap: break-word;">${best_timing}
            </pre>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// function DeliveryInsights() {
//     document.getElementById('deliveryInsightsPopup').style.display = 'block';
//     document.getElementById('popupOverlay').style.display = 'block';
//     contentType = sessionStorage.getItem('contentType');
//     const formData = new FormData();
//     formData.append('contentType', contentType);

//     fetch('/generate-timing', {
//         method: 'POST',
//         body: formData,
//     })
//     .then(response => response.json())
//     .then(data => {

//         // // Store the response data in sessionStorage based on content type
//         //     sessionStorage.setItem('generatedContentData', data);  // Store the response data
//         // // Navigate to content generation tab and then populate data
//         // nextTab('contentGeneration');
//         let best_timing = data.best_timing;
//          best_timing = best_timing.replace(/[`*]/g, '');
//         document.getElementById('bestTimeAIContent').innerHTML = `
//             <pre style="font-family: 'Arial', sans-serif; font-size: 16px; white-space: pre-wrap; word-wrap: break-word; width: 100%; overflow-wrap: break-word;">
//                 ${best_timing}
//             </pre>
//         `;
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }

function getInsights(){
    document.getElementById('InsightsPopup').style.display = 'block';
    document.getElementById('popupOverlayInsights').style.display = 'block';
    const prompt = document.getElementById('Question').value; // or get it from the form
    const formData = new FormData();
    formData.append('prompt', prompt);  // Send the file path to the backend

    fetch('/generate-insights', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        let insights = data.insights;
        insights = insights.replace(/[`*]/g, ''); // Remove unwanted characters
        document.getElementById('campaignInsights').innerHTML = '';
        document.getElementById('campaignInsights').innerHTML = `
            <pre style="font-family: 'Arial', sans-serif; font-size: 16px; white-space: pre-wrap; word-wrap: break-word; width: 100%; overflow-wrap: break-word;">${insights}
            </pre>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function closeDeliveryInsights() {
    document.getElementById('deliveryInsightsPopup').style.display = 'none';
    document.getElementById('popupOverlay').style.display = 'none';
}

function closeInsights() {
    document.getElementById('InsightsPopup').style.display = 'none';
    document.getElementById('popupOverlayInsights').style.display = 'none';
}


