import React, { useState } from "react";
import apiClient from "../services/apiClient";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const JobForm = () => {
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const [submittedData, setSubmittedData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [endDate, setEndDate] = useState("");
  const [candidates, setCandidates] = useState([""]);

  const handleCandidateChange = (index, event) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index] = event.target.value;
    setCandidates(updatedCandidates);
  };

  const addCandidateField = () => {
    setCandidates([...candidates, ""]);
  };

  const removeCandidateField = (index) => {
    const updatedCandidates = candidates.filter((_, i) => i !== index);
    setCandidates(updatedCandidates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      jobTitle,
      jobDescription,
      experienceLevel,
      candidates,
      endDate,
    };

    if (isEditing) {
      const updatedData = [...submittedData];
      updatedData[editIndex] = formData;
      setSubmittedData(updatedData);
      setIsEditing(false);
    } else {
      setSubmittedData([...submittedData, formData]);
    }
    console.log("submitting");
    

    try {
      console.log("enter try");
      

      const response = await apiClient.post(
        "/api/job/create-job",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      
      navigate("/");
    } catch (error) {
      console.error("Error submitting job details:", error);
      alert("Failed to submit job details.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="interview-form">
      {/* Job Title */}
      <div className="form-field">
        <label>Job Title</label>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />
      </div>

      {/* Job Description */}
      <div className="form-field">
        <label>Job Description</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
        />
      </div>

      {/* Experience Level */}
      <div className="form-field">
        <label>Experience Level</label>
        <select
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
          required
        >
          <option value="">Select experience level</option>
          <option value="junior">Junior</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>
      </div>

      {/* Add Candidate */}
      <div className="form-field">
        <label>Candidates</label>
        {candidates.map((candidate, index) => (
          <div key={index} className="candidate-field">
            <input
              type="text"
              value={candidate}
              onChange={(e) => handleCandidateChange(index, e)}
              placeholder={`Candidate ${index + 1}`}
              required
            />
            {/* Remove Candidate Button */}
            <button
              type="button"
              className="remove-candidate-btn"
              onClick={() => removeCandidateField(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-candidate-btn"
          onClick={addCandidateField}
        >
          + Add Candidate
        </button>
      </div>

      {/* End Date */}
      <div className="form-field">
        <label>End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        {isEditing ? "Update" : "Send"}
      </button>
    </form>
  );
};

export default JobForm;
