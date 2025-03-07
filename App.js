import { useState } from "react";
import { motion } from "framer-motion";
import { Trash, Edit, UserPlus } from "lucide-react";
import "./App.css";

export default function CollegeAdmissionManagement() {
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [name, setName] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [role, setRole] = useState("student");
  const [department, setDepartment] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const addEntry = () => {
    if (name.trim() === "" || department.trim() === "") return;
    
    if (role === "student" && admissionNumber.trim() === "") return;
    if (role === "faculty" && idNumber.trim() === "") return;

    if (editingIndex !== null) {
      const updatedList = role === "student" ? [...students] : [...faculty];
      updatedList[editingIndex] = role === "student"
        ? { name, department, admissionNumber }
        : { name, department, idNumber };

      role === "student" ? setStudents(updatedList) : setFaculty(updatedList);
      setEditingIndex(null);
    } else {
      role === "student"
        ? setStudents([...students, { name, department, admissionNumber }])
        : setFaculty([...faculty, { name, department, idNumber }]);
    }

    setName("");
    setDepartment("");
    setAdmissionNumber("");
    setIdNumber("");
  };

  const deleteEntry = (index, isStudent) => {
    isStudent
      ? setStudents(students.filter((_, i) => i !== index))
      : setFaculty(faculty.filter((_, i) => i !== index));
  };

  const editEntry = (index, isStudent) => {
    const entry = isStudent ? students[index] : faculty[index];
    setName(entry.name);
    setDepartment(entry.department);
    setRole(isStudent ? "student" : "faculty");

    if (isStudent) {
      setAdmissionNumber(entry.admissionNumber);
      setIdNumber("");
    } else {
      setIdNumber(entry.idNumber);
      setAdmissionNumber("");
    }

    setEditingIndex(index);
  };

  return (
    <div className="container">
      <h1>College Admission Management</h1>
      <div className="form-container">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
          className="input"
        />
        <input
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Enter Department"
          className="input"
        />
        
        {role === "student" && (
          <input
            value={admissionNumber}
            onChange={(e) => setAdmissionNumber(e.target.value)}
            placeholder="Admission Number"
            className="input"
          />
        )}

        {role === "faculty" && (
          <input
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            placeholder="Faculty ID Number"
            className="input"
          />
        )}

        <select value={role} onChange={(e) => setRole(e.target.value)} className="input">
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
        
        <button onClick={addEntry} className="btn add-btn">
          <UserPlus size={18} /> {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <div className="list-container">
        <h2>Students</h2>
        {students.map((student, index) => (
          <motion.div
            key={index}
            className="entry"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span>{student.name} - {student.department} (ID: {student.admissionNumber})</span>
            <div className="actions">
              <button onClick={() => editEntry(index, true)} className="btn edit-btn">
                <Edit size={18} />
              </button>
              <button onClick={() => deleteEntry(index, true)} className="btn delete-btn">
                <Trash size={18} />
              </button>
            </div>
          </motion.div>
        ))}

        <h2>Faculty</h2>
        {faculty.map((faculty, index) => (
          <motion.div
            key={index}
            className="entry"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span>{faculty.name} - {faculty.department} (ID: {faculty.idNumber})</span>
            <div className="actions">
              <button onClick={() => editEntry(index, false)} className="btn edit-btn">
                <Edit size={18} />
              </button>
              <button onClick={() => deleteEntry(index, false)} className="btn delete-btn">
                <Trash size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}