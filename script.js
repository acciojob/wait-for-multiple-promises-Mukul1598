//your JS code here. If required.
// Function to create a Promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise(promiseName) {
    return new Promise((resolve) => {
        const time = Math.floor(Math.random() * 3) + 1; // Random time between 1 and 3 seconds
        setTimeout(() => {
            resolve({ name: promiseName, time });
        }, time * 1000);
    });
}

// Create 3 promises
const promise1 = createRandomPromise('Promise 1');
const promise2 = createRandomPromise('Promise 2');
const promise3 = createRandomPromise('Promise 3');

// Display loading text
const output = document.getElementById('output');
output.innerHTML = `
    <tr>
        <td colspan="2" class="text-center">Loading...</td>
    </tr>
`;

// Use Promise.all to wait for all promises to resolve
const startTime = performance.now();

Promise.all([promise1, promise2, promise3]).then((results) => {
    const endTime = performance.now();
    const totalTime = (endTime - startTime) / 1000; // Total time in seconds

    // Remove loading text
    output.innerHTML = '';

    // Add results to the table
    results.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${result.name}</td>
            <td>${result.time}</td>
        `;
        output.appendChild(row);
    });

    // Add total row
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td>Total</td>
        <td>${totalTime.toFixed(3)}</td>
    `;
    output.appendChild(totalRow);
});

