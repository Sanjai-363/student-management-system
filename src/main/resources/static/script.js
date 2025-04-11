const apiUrl = 'http://localhost:8080/api/students';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('studentForm');
  const studentList = document.getElementById('studentList');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const department = document.getElementById('department').value;
      const age = document.getElementById('age').value;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, department, age }),
      });

      if (response.ok) {
        alert("Student added successfully!");
        form.reset();
      }
    });
  }

  if (studentList) {
    loadStudents();
  }
});

async function loadStudents() {
  const response = await fetch(apiUrl);
  const students = await response.json();

  const studentList = document.getElementById('studentList');
  if (!studentList) return;

  studentList.innerHTML = '';

  students.forEach(student => {
    const div = document.createElement('div');
    div.className = 'student-card';
    div.innerHTML = `
      <p><strong>${student.name}</strong> (${student.department}) - Age: ${student.age}</p>
      <button onclick="deleteStudent(${student.id})">Delete</button>
      <button onclick="editStudent(${student.id}, '${student.name}', '${student.department}', ${student.age})">Edit</button>
    `;
    studentList.appendChild(div);
  });
}

async function deleteStudent(id) {
  const confirmed = confirm("Are you sure you want to delete this student?");
  if (confirmed) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    loadStudents();
  }
}

async function editStudent(id, currentName, currentDept, currentAge) {
  const name = prompt("Enter new name:", currentName);
  const department = prompt("Enter new department:", currentDept);
  const age = prompt("Enter new age:", currentAge);

  if (name && department && age) {
    const updatedStudent = { name, department, age: parseInt(age) };

    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedStudent)
    });

    if (response.ok) {
      loadStudents();
    } else {
      alert('Failed to update student');
    }
  }
}
