function sendMessage() {
    const select = document.getElementById('questionSelect');
    const userMessageDiv = document.getElementById('userMessage');
    const selectedMessage = select.value;
    if (selectedMessage) {
        userMessageDiv.textContent = selectedMessage;
        select.selectedIndex = 0; // Reset the dropdown after sending the message
    }
}

// Existing Hamburger Menu Toggle
document.getElementById('mobile-menu').addEventListener('click', function() {
    var navList = document.querySelector('.nav-list');
    navList.classList.toggle('active'); // Toggle the 'active' class to show/hide the nav list
});

// Initial setup variables
let currentState = "category";
let selectedRoot = "";
let selectedCategory = "";

const diagnosticData = {
    feel: {
        Engine: {
            questions: ["Vibrations when the car is on idle", "The engine suddenly stops after switching gears", "Car won’t start"],
            potentialIssues: [
                "Engine Misalignment or Unbalanced Tires. Engine misalignment causes the engine to vibrate while running especially during idle. Potential causes for this are: Worn engine mounts, ignition problems, and fuel delivery issues. Unbalanced tires usually cause vibrations when the car is moving.",
                "Inspect transmission fluid and scan for engine error codes. Check if the fluid level is low using a dipstick or a diagnostic tool. Also check for the fluid condition as the transmission fluid should be reddish color. If it appears dark and dirty, it needs to be replaced as it could lead to rough shifting and engine stalls. For scanning, Actual diagnosis is needed.",
                "Dead Battery, Faulty Starter Motor, or Fuel System Issues. A dead or weak battery is a common reason for a car not starting, especially if the lights are dim. A faulty starter motor can also prevent the engine from starting. Lastly, fuel system issues like a clogged fuel filter or faulty fuel pump can restrict fuel flow, causing the engine not to start."
            ],
            responses: [
                "Check engine balance and tire alignment. Inspect the engine mounts focusing on cracks, damage, or excessive movement in the engine mount. If worn out, replacing them should reduce the vibrations.",
                "Inspect transmission fluid and scan for engine error codes. Check if the fluid level is low using a dipstick or a diagnostic tool. Also check for the fluid condition as the transmission fluid should be reddish color. If it appears dark and dirty, it needs to be replaced as it could lead to rough shifting and engine stalls. For scanning, Actual diagnosis is needed.",
                "Check the battery voltage with a multimeter as the battery may need to be charged or replaced. Inspect the battery terminal as well for corrosion and clean if necessary. For the starter motor, listen for a clicking sound when turning the key, a rapid click indicates a faulty starter motor therefore the connections need to be tested to replace any faulty components. Lastly, check for the fuel levels and inspect the fuel filter for clogs as it might be one of the reasons why the car won’t start."
            ]
        },
        Brakes: {
            questions: ["Vibrations when braking", "Spongy or soft brake pedal"],
            potentialIssues: [
                "Warped/Uneven brake rotors because of excessive heat, wear, or stress. This leads to uneven brake performance.",
                "There is air in the brake lines or brake fluid leak. If there is air trapped in the brake’s lines, it can compress when you press the pedal causing the “spongy” feeling. If there is a leak in the break fluid lines, the system will lose pressure leading to a soft pedal."
            ],
            responses: [
                "Inspect the brake rotos and brake pads. Depending on the status of the brakes, the mechanics can resurface the rotor or replace it.",
                "You can bleed the brakes to remove and trapped air from the brake lines and restore proper hydraulic pressure. You also need to visually check/inspect the brake lines for any signs of leaking fluid. If you find a leak, you need to replace or repair the damaged brake line or component then refill with new brake fluid."
            ]
        },
        Steering: {
            questions: ["Hard to steer", "Car pulls to one side"],
            potentialIssues: [
                "Steering System or Tire Issue. The power steering fluid could be low making the steering wheel difficult to turn. The power steering pump could also be failing causing difficulties when steering. The steering rack and pinion could also be worn or damaged. Also make sure to check the tire pressure and alignment as they can make the vehicle hard to steer if worn out and not aligned properly.",
                "Uneven tire pressure or the car has alignment issue. If the air pressure is not even, it can cause the car to pull to the side with lower pressure. If the car’s wheels are misaligned, it will pull the car to one side when driving straight."
            ],
            responses: [
                "Check the power steering fluid level and condition. They should be enough and clean to provide a smooth steering. If not, then it needs to be replaced. Inspect the steering rack and linkage for any signs of hydraulic fluid leaks as this could indicate issue with the rack connections, also keep in mind to check for wear and tear. Lastly, check for the tire pressure and alignment to assure everything is in its right place.",
                "Check the tire pressure and ensure that all tires are inflated to the recommended pressure. If it is misaligned, take the car to a mechanic to inspect and correct the alignment of the wheels."
            ]
        }
    },
    see: {
        "Smoke from under the hood": {
            potentialIssues: ["Overheating or Oil Leak. Overheating engine can cause the coolant to boil creating a steam that escapes from the cooling system appearing as the smoke. While Oil leaks occur when oil drips onto hot surfaces causing the oil to burn and produce smoke."],
            responses: ["Inspect for oil leaks and test the cooling system. Inspect the valve cover, oil pan, or exhaust manifold. Check for oil drips or wet spots and fix the leaks. Check the oil level using the dipstick and if it is low, make sure refill it and fix all the present leaks. Check the radiator fan as well as it helps cool the engine. If it doesn’t turn on as the engine heats up, the fan may need to be repaired or replaced."]
        },
        "Warning lights on the dashboard": {
            potentialIssues: [": Electrical or Specific Part Failure"],
            responses: ["Perform a diagnostic test to retrieve fault codes and identify the issue."]
        },
        "Overheating sign on the panel gauge": {
            potentialIssues: ["Low coolant level, Faulty thermostat, radiator issues, water pump failure, coolant hose leaks, or blocked/clogged cooling system."],
            responses: ["Top off the coolant if necessary and always look for leaks. Inspect the cooling system for leaks as well, from the radiator, hoses, or water pump. Check if the thermostat is operating properly and replace it if it’s stuck or malfunctioning. Check the radiator and hoses for damage, cracks, or blockages to repair everything that is damaged."]
        },
        "Flickering headlights": {
            potentialIssues: ["The car could have a faulty alternator or battery. The alternator is responsible for charging the battery and powering the car’s electrical system while the Battery, if near the end of its lifespan, it may not hold a sufficient charge leading to inconsistent power supply."],
            responses: ["Test the alternator output using a multimeter while the engine is running to determine if it needs replacement. For the battery, use a battery tester or multimeter to measure the battery’s charge and condition."]
        },
        "Leak under the car": {
            questions: ["Oil leak = Dark Brown, Black", "Coolant leak = Green, Pink, Orange, Yellow","Transmission fluid leak = Red, Pink","Power Steering leak = Red, Pink, Dark Yellow","Brake fluid leak = Light Yellow, Dark Brown","Water = Clear"],
            potentialIssues: [
                "Worn Gaskets, Loose Oil Filter, or Damaged Oil Pan. Oil leaks commonly result from worn or damaged gaskets which allow oil to slip through. A loose or improperly installed oil filter can also cause leaks. Additionally, an impact on the oil pan or a corroded drain plug may lead to oil dripping",
                "Damaged Radiator, Worn Hoses, or Faulty Water Pump. Coolant leaks can take happen due to a damaged radiator, worn-out hoses that develop cracks over time, or a failing water pump with compromised seals. These leaks can lead to engine overheating if not addressed promptly.",
                "Faulty Seals, Damaged Transmission Pan, or Loose Transmission Lines. Transmission fluid leaks often comes from worn-out seals that degrade over time. A damaged or punctured transmission pan, possibly from road debris, can also cause leaks. Additionally, loose or damaged transmission fluid lines may result in fluid dripping.",
                "Worn Power Steering Pump, Cracked Hoses, or Faulty Rack and Pinion Seal. Power steering fluid leaks can often start from a failing power steering pump, where seals may degrade over time, causing leakage. Cracked or worn hoses that carry fluid between components are also a common source of leaks. Additionally, a leak from the rack and pinion assembly can be caused by worn seals.",
                "Damaged break lines could be a reason for this as they can become corroded, damaged, or cracked leading to fluid leaks. You might also encounter a faulty master cylinder as it pumps brake fluid through the brake lines. If the seals inside the cylinder fail, brake fluid can leak.",
                "Damaged door seals or leaking heater core. Damaged or worn door seals can allow water entry during rain. In some cases, a leaking heater core may cause water to pool in the cabin, often accompanied by a coolant odor."
            ],
            responses: [
                "Visually inspect around the engine for oil residue near the valve cover, oil pan, and other gasket locations. Replace any gaskets showing signs of wear, cracks, or damage. Also make sure to check if the oil filter is tightly secured and replace it as well if there are any signs of damage.",
                "Inspect the radiator for any visible cracks, corrosion, or wet spots, check for any drips coming from the bottom. If damage is present, consider repairing or replacing the radiator. Examine the coolant hoses connected to the radiator, thermostat, and engine for any signs of damage afterwards. Tighten any loose clamps and replace hoses that appear compromised.",
                "Check the transmission for any signs of fluid buildup near seals, particularly the output and input shaft seals. Replace any seals that show visible signs of leaking or damage. Inspect the transmission pan for cracks, rust, or dents too. Make sure the pan bolts are tightened to specification, as loose bolts can cause leaking. If visible damage is present, consider replacing the pan. Also, check the fluid lines running to the transmission cooler for cracks, kinks, or loose connections. Tighten or replace any loose or damaged lines if necessary.",
                "Inspect the area around the power steering pump for any fluid buildup or dripping. If seals are leaking, the pump may need to be resealed or replaced. Examine the power steering hoses for any visible cracks, bulges, or wet spots along the length of the hose and near the connectors. Tighten clamps if they are loose or replace hoses if they are worn out or damaged. Lastly, look around the rack and pinion for any fluid buildup or leaks. If seals are worn, they may need to be replaced, or in severe cases, the entire rack and pinion assembly might need attention.",
                "If the fluid is low, it is a sign of a possible leak. Top off the brake fluid with the recommended type and monitor the level. If it drops again, there’s likely a leak somewhere in the system. Inspect near the brake lines, calipers, or wheel cylinders, those components are likely to be the source of the leak and needs to be repaired or replaced. If the master cylinder is leaking, it needs to be repaired or be replaced.",
                "If the fluid is low, it is a sign of a possible leak. Top off the brake fluid with the recommended type and monitor the level. If it drops again, there’s likely a leak somewhere in the system. Inspect near the brake lines, calipers, or wheel cylinders, those components are likely to be the source of the leak and needs to be repaired or replaced. If the master cylinder is leaking, it needs to be repaired or be replaced."
            ]
        }
    },
    smell: {
        "It smells like burning rubber": {
            potentialIssues: ["Belt Wear or Electrical Malfunction. Belts can wear out over time or become misaligned. This can generate friction and head leading to the smell of rubber. Loose connections and short circuit may cause burns as well emitting the same odor mentioned."],
            responses: ["Inspect the belts for wear, cracks, misalignment, or slippage. Adjust or replace it based on its needs. Check the electrical wiring for any damaged insulation, overheating, or loose connections. Replace all the damaged wires that has been seen."]
        },
        "Chemical smell": {
            potentialIssues: ["AC System and the coolant has a leak which causes the smell as they enter the cabin."],
            responses: ["Inspect the AC system for leaks and ensure coolant levels are correct. If the coolant levels are low, you can check leaks around the radiator, hoses, or heater core. While checking for issues around the area, inspect the electrical wirings as well for issues like burnt components."]
        },
        "Rotten egg": {
            potentialIssues: ["Catalytic converter failure. They are used to help reduce the harmful emissions of the exhaust system. Causes could be Fuel mixture issues, Engine misfires, and Oil or coolant leaks."],
            responses: ["Visual inspection is needed. Look for any signs of damage in the converter and check the exhaust for leaks. Further testing is required to identify the main problem."]
        },
        "Fuel smell inside the car": {
            potentialIssues: ["Fuel lines could be damaged or loose. If so, fuel can leak out and vapor may enter the cabin. Faulty fuel injector is also considered, they are responsible for delivering the right amount of fuel into the combustion chamber. If damaged it can lead to fuel leaking out around the engine bay causing the cabin to smell like fuel."],
            responses: ["Visual inspection of fuel lines and fuel injector is needed. Check for any signs of fuel dripping or wet spots. If you find a wet spot near any part of the line, you likely have a fuel leak that needs immediate repair. If you are unable to visually find a leak, a visual diagnosis of a mechanic is needed."]
        }
    },
    hear: {
        "High-pitched squealing noises in the engine": {
            potentialIssues: ["Engine Component Failure or Exhaust System Issue. The engine could have worn or loose belts causing it to make a high-pitched squealing noise. The source of the noises is the serpentine belt or the timing belt. Check for leaks as oil or coolant can leak into the serpentine belt making it slippery causing it to squeal."],
            responses: ["Do a visual inspection on the Serpentine Belt. Locate it under the hood and check for visible signs of wear such as cracks, fraying, or glazing. Make sure that it is properly seated on the pulleys as well; Check if it is loose as the tension might be incorrect. Same goes for the timing belt, if they are worn out, it is best to be replaced to prevent any further damage. Lastly, check if there are leaks, if so, fix the leak and clean or replace the contaminated belt."]
        },
        "Tapping or Ticking noises in the engine": {
            potentialIssues: ["This noise could indicate problems with the valve train such as worn lifters, rocker arms, or valve clearance issues."],
            responses: ["Check for the engine oil level as low engine oil could lead to tapping noises, make sure to change it if it is dirty or thick. Inspect the hydraulic lifters if they are sticking and if there is a faulty lifter, it may need to be replaced. If the valve clearance is too large, it may need to be adjusted. If the rocker arms and pushrods are loose, worn, or damaged, they cause a ticking noise. Tighten any loose rocker arms to the required specifications and replace the damaged parts."]
        },
        "Grinding or Knocking noises in the engine": {
            potentialIssues: ["This could indicate that the engine has worn crankshaft or connecting rod bearings. This is often a sign of severe engine wear and may require a rebuild. It is also possible that the engine is not getting enough oil, and it can cause the crankshaft and connecting rod bearings to grind or knock due to insufficient lubrication. The timing chain could also be worn, and this keeps the camshaft and crankshaft synchronized, if it fails, I can result to engine damage."],
            responses: ["Check for the engine oil levels and pressure to ensure proper lubrication. Inspect the crankshaft and connecting rod bearings for wear damage, if so, they need to be replaced immediately to avoid complete engine failure. Examine the timing/chain belt tensioners for signs of wear or looseness. Scan the engine for error codes, it would be recommended that it is scanned in the shop."]
        },
        "Rattling or Slapping noises from the engine ": {
            potentialIssues: ["This noise can come from a loose or worn timing chain or belt issues in the engine. If the timing belt chain or belt fails, it can cause catastrophic engine damage. A loose chain may slap against other engine component creating a slapping sound, this is usually more noticeable during startup."],
            responses: ["Visually inspect the timing chain or belt for wear, looseness, or damage and check the timing chain tensioner and guides for wear or failure, replace them if not functioning properly. Locate the noise by listening near the timing cover to confirm if the noise is related top timing components. Check the engine oil levels and condition as they could affect the timing chain tensioner."]
        },
        "Roaring or Hissing Noise from the Exhaust": {
            potentialIssues: ["This noise could be caused by an exhaust leak. If there is a hole or crack in the exhaust pipes or muffler, this can happen. This tends to get louder as the vehicle accelerates. Exhaust system can allow exhaust gasses to escape before they reach the muffler producing a loud, roaring sound, if it is small, then it could produce a hissing sound."],
            responses: ["Visually inspect the timing chain or belt for wear, looseness, or damage and check the timing chain tensioner and guides for wear or failure, replace them if not functioning properly. Locate the noise by listening near the timing cover to confirm if the noise is related top timing components. Check the engine oil levels and condition as they could affect the timing chain tensioner."]
        }
    }
};

// Main sendMessage function to handle the flow based on the current state
function sendMessage() {
    const select = document.getElementById('questionSelect');
    const chatContainer = document.querySelector('.chat-container');
    const selectedMessage = select.value;

    if (!selectedMessage) return; // Exit if no selection

    // Display the user's message in the chat
    displayUserMessage(selectedMessage);

    // Handle the selection flow based on current state
    switch (currentState) {
        case "category":
            handleCategorySelection(selectedMessage);
            break;
        case "subcategory":
            handleSubCategorySelection(selectedMessage);
            break;
        case "question":
            handleQuestionSelection(selectedMessage);
            break;
    }

    // Reset the select dropdown after each selection
    select.selectedIndex = 0;
}

// Display the user's selection as a chat bubble
function displayUserMessage(message) {
    const chatContainer = document.querySelector('.chat-container');
    let userChatBubble = document.createElement('div');
    userChatBubble.className = 'chat-bubble-user';
    userChatBubble.innerHTML = `<div class='chat-message user'>${message}</div>`;
    chatContainer.appendChild(userChatBubble);
    scrollToLatestMessage();
}

// Handle Category Selection (I CAN FEEL, I CAN SEE, etc.)
function handleCategorySelection(selectedMessage) {
    selectedRoot = selectedMessage.toLowerCase().replace("i can ", "");
    updateCategorySelect(selectedRoot);
    currentState = "subcategory";

    // Display the bot's prompt for subcategory selection
    displayBotMessage("Choose a sub-category:");
}

// Handle Sub-Category Selection (Smoke from under the hood, Leak under the car, etc.)
function handleSubCategorySelection(selectedMessage) {
    selectedCategory = selectedMessage;
    const selectedData = diagnosticData[selectedRoot][selectedCategory];

    if (selectedData.questions && selectedData.questions.length > 0) {
        // If there are questions, go to the question selection step
        updateQuestionSelect(selectedRoot, selectedCategory);
        currentState = "question";
        displayBotMessage("Choose a specific issue:");
    } else {
        // Directly display potential issue and diagnostic action if no further questions
        displayPotentialIssueAndAction({
            potentialIssue: selectedData.potentialIssues[0],
            diagnosticAction: selectedData.responses[0]
        });
        resetToInitialState();
    }
}

// Handle Question Selection within the second sub-category
function handleQuestionSelection(selectedMessage) {
    const index = diagnosticData[selectedRoot][selectedCategory].questions.indexOf(selectedMessage);
    const potentialIssue = diagnosticData[selectedRoot][selectedCategory].potentialIssues[index];
    const diagnosticAction = diagnosticData[selectedRoot][selectedCategory].responses[index];
    displayPotentialIssueAndAction({ potentialIssue, diagnosticAction });
    resetToInitialState();
}

// Display bot message in the chat
function displayBotMessage(message) {
    const chatContainer = document.querySelector('.chat-container');
    let botChatBubble = document.createElement('div');
    botChatBubble.className = 'chat-bubble';
    botChatBubble.innerHTML = `<img src="newlogo.png" alt="AG Tech Bot" class="chatbot-logo"><div class='chat-message'>${message}</div>`;
    chatContainer.appendChild(botChatBubble);
    scrollToLatestMessage();
}



// Display potential issues and diagnostic actions
function displayPotentialIssueAndAction(data) {
    const chatContainer = document.querySelector('.chat-container');
    
    let potentialIssueBubble = document.createElement('div');
    potentialIssueBubble.className = 'chat-bubble';
    potentialIssueBubble.innerHTML = `<img src="newlogo.png" alt="AG Tech Bot" class="chatbot-logo"><div class='chat-message'>Potential Issue: ${data.potentialIssue}</div>`;
    chatContainer.appendChild(potentialIssueBubble);
    scrollToLatestMessage();

    setTimeout(() => {
        let diagnosticActionBubble = document.createElement('div');
        diagnosticActionBubble.className = 'chat-bubble';
        diagnosticActionBubble.innerHTML = `<img src="newlogo.png" alt="AG Tech Bot" class="chatbot-logo"><div class='chat-message'>Diagnostic Action: ${data.diagnosticAction}</div>`;
        chatContainer.appendChild(diagnosticActionBubble);
        scrollToLatestMessage();
        displayFollowUpMessage();

        // Display the print button after the final response
        const printButton = document.getElementById('printButton');
        printButton.style.display = 'inline-block'; // Show the print button
    }, 1000);
}

// Add event listener for the print button
document.getElementById('printButton').addEventListener('click', function() {
    // Create a print-specific content container
    const printContent = document.createElement('div');
    printContent.innerHTML = `
        <div style="text-align: center; background-color: #f0f0f0; color: black; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
            <img src="newlogo.png" alt="AG Tech Logo" style="width: 80px; height: auto; margin-bottom: 10px;"/>
            <h1 style="margin: 0; font-size: 24px; color: black;">AG TECHNICIAN SERVICING</h1>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: black;">Initial Diagnostic Result</p>
        </div>
        <hr style="border: 1px solid #ccc; margin: 10px 0;"/>
    `;

    // Select only the bot's potential issue and diagnostic action bubbles
    document.querySelectorAll('.chat-bubble').forEach(bubble => {
        if (bubble.innerText.includes('Potential Issue:') || bubble.innerText.includes('Diagnostic Action:')) {
            const clonedBubble = bubble.cloneNode(true);
            clonedBubble.style.fontSize = '12px'; // Smaller font size for compact print
            clonedBubble.style.padding = '8px'; // Adjust padding for compactness
            clonedBubble.style.textAlign = 'center'; // Center-align text
            printContent.appendChild(clonedBubble);
        }
    });

    // Print the formatted content
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Reload to restore the page state after printing
});








// Follow-up message for further questions
function displayFollowUpMessage() {
    displayBotMessage("If you have any other concerns, you can choose from the options again.");
}

// Scroll to the latest message in the chat
function scrollToLatestMessage() {
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Reset to initial state
function resetToInitialState() {
    prepareInitialSelect();
    currentState = "category";
}

// Update category select options
function updateCategorySelect(root) {
    const select = document.getElementById('questionSelect');
    select.innerHTML = ''; // Clear existing options
    Object.keys(diagnosticData[root]).forEach(category => {
        let option = new Option(category, category);
        select.add(option);
    });
}

// Update question select options
function updateQuestionSelect(root, category) {
    const select = document.getElementById('questionSelect');
    select.innerHTML = ''; // Clear existing options
    diagnosticData[root][category].questions.forEach(question => {
        let option = new Option(question, question);
        select.add(option);
    });
}

// Prepare the initial select options
function prepareInitialSelect() {
    const select = document.getElementById('questionSelect');
    select.innerHTML = `
        <option value="" disabled selected>Select a Main Root</option>
        <option value="I CAN FEEL">I CAN FEEL</option>
        <option value="I CAN SEE">I CAN SEE</option>
        <option value="I CAN SMELL">I CAN SMELL</option>
        <option value="I CAN HEAR">I CAN HEAR</option>
    `;
}

// Initialize event listeners on document load
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('sendButton').addEventListener('click', sendMessage);
    prepareInitialSelect();
});