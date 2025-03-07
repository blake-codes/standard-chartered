import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaUser, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ChatBot from "../components/ChatBot";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: ${spin} 0.8s linear infinite;
  display: inline-block;
  margin-right: 8px;
`;

// Styled Components for styling
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  min-height: 100vh;
  padding-top: 40px;
  padding-right: 20px;
  padding-left: 20px;
`;

const FormContainer = styled.div`
  max-width: 800px;
  width: 100%;
  padding: 20px;
  margin: 20px;
  background-color: #ffffff;
  border: 0.5px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
  margin-bottom: 100px;
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Heading = styled.h1`
  text-align: center;
  color: #333;
  font-size: 14px;
  top: 0;
`;

const StepContainer = styled.div`
  width: 100%;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

const Input = styled.input`
  padding: 14px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 15px;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #4caf50;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  width: 100%;
  @media (max-width: 768px) {
    width: auto;
  }
  &:hover {
    background-color: #45a049;
  }
  &:disabled {
    background-color: #b0c4de;
    color: #333;
    cursor: not-allowed;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const ReviewInfo = styled.p`
  font-size: 16px;
  color: #555;
`;

const OpenAccount = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    email: "",
    phoneNumber: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    occupation: "",
    incomeRange: "",
    ssn: "",
    accountType: "",
  });
  const [documents, setDocuments] = useState({
    passport: null,
    idProof: null,
    addressProof: null,
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Handle personal form data changes
  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file upload for documents
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (files[0].size > maxSize) {
        toast.error("File size must be 5MB or less.");
        e.target.value = ""; // Reset the file input
        return;
      }

      setDocuments((prevDocuments) => ({
        ...prevDocuments,
        [name]: files[0],
      }));

      // Create a preview URL for displaying the image
      if (name === "passport") {
        const objectUrl = URL.createObjectURL(files[0]);
        setPreview(objectUrl);
      }
    }
  };

  // Handle submission of the application
  const handleSubmit = async () => {
    setLoading(true);
    try {
      let passportUrl = "";
      let idProofUrl = "";
      let addressProofUrl = "";
      if (documents.passport && documents.idProof && documents.addressProof) {
        passportUrl = await uploadToCloudinary(documents.passport);
        idProofUrl = await uploadToCloudinary(documents.idProof, "raw");
        addressProofUrl = await uploadToCloudinary(
          documents.addressProof,
          "raw"
        );
      }

      const payload = {
        ...formData,
        passport: passportUrl,
        idProof: idProofUrl,
        addressProof: addressProofUrl, // Store the uploaded URL
      };

      const response = await fetch(
        "https://standard-server.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Account information submitted successfully!");
      } else {
        const message = data.message || "Something went wrong.";
        toast.error(message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit account information.");
    } finally {
      setLoading(false);
    }
  };

  const uploadToCloudinary = async (
    file: File,
    resourceType: "image" | "raw" = "image"
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_PRESET || "your_preset_name"
    ); // Store in env
    formData.append("folder", "your_folder"); // Optional: Organize files in a Cloudinary folder

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/${resourceType}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Cloudinary upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`URL IS ${data.secure_url}`);
      return data.secure_url; // Return the uploaded image/file URL
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      throw error;
    }
  };

  // Move to next step in the process
  const nextStep = () => {
    setStep(step + 1);
  };

  // Go back to previous step
  const previousStep = () => {
    setStep(step - 1);
  };

  return (
    <>
      <Navbar />
      <Container>
        <ToastContainer />
        <FormContainer>
          <Heading>
            <FaUser /> Kindly provide the information requested below to enable
            us create an account for you.
          </Heading>
          <StepContainer>
            {/* Step 1: Choose Account Type */}
            {step === 1 && (
              <Step>
                <h3>Personal Details</h3>
                <form>
                  <div>
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleFormDataChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Middle Name</Label>
                    <Input
                      type="text"
                      name="middleName"
                      placeholder="Enter your middle name"
                      value={formData.middleName}
                      onChange={handleFormDataChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleFormDataChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleFormDataChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Home Address</Label>
                    <Input
                      type="text"
                      name="address"
                      placeholder="Enter your home address"
                      value={formData.address}
                      onChange={handleFormDataChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleFormDataChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Enter your phone number"
                      value={formData.phoneNumber}
                      onChange={handleFormDataChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Country</Label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      required
                      style={{
                        padding: "14px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        width: "100%",
                        marginBottom: "20px",
                      }}
                    >
                      <option value="">Select Country</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>

                      <option value="France">France</option>
                      <option value="Spain">Spain</option>
                    </select>
                  </div>

                  <div>
                    <Label>State</Label>
                    <Input
                      type="text"
                      name="state"
                      placeholder="Enter your state"
                      value={formData.state}
                      onChange={handleFormDataChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>City</Label>
                    <Input
                      type="text"
                      name="city"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={handleFormDataChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Zip code</Label>
                    <Input
                      type="text"
                      name="zipCode"
                      placeholder="Enter your zip code/postal code"
                      value={formData.zipCode}
                      onChange={handleFormDataChange}
                      required
                    />
                  </div>
                </form>
                <ButtonContainer>
                  <Button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      nextStep();
                    }}
                  >
                    Next
                    <FaArrowRight style={{ marginLeft: "8px" }} />
                  </Button>
                </ButtonContainer>
              </Step>
            )}

            {/* Step 2: Personal Details */}
            {step === 2 && (
              <Step>
                <h3>Employment information</h3>
                <div>
                  <Label>Occupation</Label>
                  <select
                    name="occupation"
                    value={formData.occupation || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, occupation: e.target.value })
                    }
                    required
                    style={{
                      padding: "14px",
                      fontSize: "16px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      width: "100%",
                      marginBottom: "20px",
                    }}
                  >
                    <option value="">Select Type of Employment</option>
                    <option value="self-Employed">Self-Employed</option>
                    <option value="public/government">
                      Public/Government Office
                    </option>
                    <option value="private/partnership">
                      Private/Partnership Office
                    </option>
                    <option value="business/sales">Business/Sales</option>
                    <option value="trading/market">Trading/Market</option>
                    <option value="military/paramilitary">
                      Military/Paramilitary
                    </option>

                    <option value="unemployed">Unemployed</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <Label>Annual Income Range</Label>
                  <select
                    name="incomeRange"
                    value={formData.incomeRange || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, incomeRange: e.target.value })
                    }
                    required
                    style={{
                      padding: "14px",
                      fontSize: "16px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      width: "100%",
                      marginBottom: "20px",
                    }}
                  >
                    <option value="">Select Income Range</option>
                    <option value="Below $20,000">Below $20,000</option>
                    <option value="$20,000 - $50,000">$20,000 - $50,000</option>
                    <option value="$50,000 - $100,000">
                      $50,000 - $100,000
                    </option>
                    <option value="$100,000 - $200,000">
                      $100,000 - $200,000
                    </option>
                    <option value="Above $200,000">Above $200,000</option>
                  </select>
                </div>
                <ButtonContainer>
                  {" "}
                  <Button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      previousStep();
                    }}
                  >
                    {" "}
                    <FaArrowLeft style={{ marginRight: "8px" }} />
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      nextStep();
                    }}
                  >
                    Next
                    <FaArrowRight style={{ marginLeft: "8px" }} />
                  </Button>{" "}
                </ButtonContainer>
              </Step>
            )}

            {/* Step 2: Banking Details */}
            {step === 3 && (
              <Step>
                <h3>Banking Details</h3>
                <div>
                  <Label>SSN/TIN(Or equivalence)</Label>
                  <Input
                    type="text"
                    name="ssn"
                    placeholder="Enter your SSN/TIN"
                    value={formData.ssn}
                    onChange={handleFormDataChange}
                    required
                  />
                </div>

                <div>
                  <Label>Account Type</Label>
                  <select
                    name="accountType"
                    value={formData.accountType || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, accountType: e.target.value })
                    }
                    required
                    style={{
                      padding: "14px",
                      fontSize: "16px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      width: "100%",
                      marginBottom: "20px",
                    }}
                  >
                    <option value="">please select account type</option>
                    <option value="checking_account">Checking Account</option>
                    <option value="savings_account">Savings Account</option>
                    <option value="current_account">Current Account</option>
                    <option value="fixed_deposit_account">
                      Fixed Deposit Account
                    </option>
                    <option value="crypto_currency_account">
                      Crypto Currency Account
                    </option>
                    <option value="business_account">Business Account</option>
                  </select>
                </div>

                <ButtonContainer>
                  {" "}
                  <Button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      previousStep();
                    }}
                  >
                    {" "}
                    <FaArrowLeft style={{ marginRight: "8px" }} />
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      nextStep();
                    }}
                  >
                    Next
                    <FaArrowRight style={{ marginLeft: "8px" }} />
                  </Button>
                </ButtonContainer>
              </Step>
            )}

            {/* Step 3: Document Upload */}
            {step === 4 && (
              <Step>
                <h2>Upload Documents</h2>
                <div>
                  <Label>Passport Photograph</Label>
                  <Input
                    type="file"
                    name="passport"
                    onChange={handleFileChange}
                    accept="image/*, .pdf"
                    required
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="Passport Preview"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        marginTop: "10px",
                      }}
                    />
                  )}
                </div>

                <div>
                  <Label>ID Proof (Passport, National ID, etc.)</Label>
                  <Input
                    type="file"
                    name="idProof"
                    onChange={handleFileChange}
                    accept="image/*, .pdf"
                    required
                  />
                </div>
                <div>
                  <Label>Proof of Address (Utility Bill, Lease, etc.)</Label>
                  <Input
                    type="file"
                    name="addressProof"
                    onChange={handleFileChange}
                    accept="image/*, .pdf"
                    required
                  />
                </div>
                <ButtonContainer>
                  <Button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      previousStep();
                    }}
                  >
                    {" "}
                    <FaArrowLeft style={{ marginRight: "8px" }} />
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      nextStep();
                    }}
                  >
                    Next
                    <FaArrowRight style={{ marginLeft: "8px" }} />
                  </Button>
                </ButtonContainer>
              </Step>
            )}

            {/* Step 4: Review and Confirm */}
            {step === 5 && (
              <Step>
                <h2>Review Your Information</h2>

                <ReviewInfo>
                  <strong>First Name:</strong> {formData.firstName}
                </ReviewInfo>
                {formData.middleName && (
                  <ReviewInfo>
                    <strong>Middle Name:</strong> {formData.middleName}
                  </ReviewInfo>
                )}
                <ReviewInfo>
                  <strong>Last Name:</strong> {formData.lastName}
                </ReviewInfo>
                <ReviewInfo>
                  <strong>Date of Birth:</strong> {formData.dateOfBirth}
                </ReviewInfo>
                <ReviewInfo>
                  <strong>Address:</strong> {formData.address}
                </ReviewInfo>
                <ReviewInfo>
                  <strong>Email:</strong> {formData.email}
                </ReviewInfo>
                <ReviewInfo>
                  <strong>Phone Number:</strong> {formData.phoneNumber}
                </ReviewInfo>
                <ReviewInfo>
                  <strong>Country:</strong> {formData.country}
                </ReviewInfo>
                <ReviewInfo>
                  <strong>State:</strong> {formData.state}
                </ReviewInfo>
                <ReviewInfo>
                  <strong>City:</strong> {formData.city}
                </ReviewInfo>
                <ReviewInfo>
                  <strong>Zip code/Postal code:</strong> {formData.zipCode}
                </ReviewInfo>
                <ReviewInfo>
                  <strong>Occupation:</strong> {formData.occupation}
                </ReviewInfo>
                <ReviewInfo>
                  <strong>Income Range:</strong> {formData.incomeRange}
                </ReviewInfo>
                <ReviewInfo>
                  <strong>SSN:</strong> {formData.ssn}
                </ReviewInfo>
                <ReviewInfo>
                  <strong>Account Type:</strong> {formData.accountType}
                </ReviewInfo>
                <ReviewInfo>
                  <strong>Passport:</strong>{" "}
                  {documents.passport ? "Uploaded" : "Not uploaded"}
                </ReviewInfo>
                <ReviewInfo>
                  <strong>ID Proof:</strong>{" "}
                  {documents.idProof ? "Uploaded" : "Not uploaded"}
                </ReviewInfo>
                <ReviewInfo>
                  <strong>Proof of Address:</strong>{" "}
                  {documents.addressProof ? "Uploaded" : "Not uploaded"}
                </ReviewInfo>
                <ButtonContainer>
                  <Button
                    disabled={loading}
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      previousStep();
                    }}
                  >
                    {" "}
                    <FaArrowLeft style={{ marginRight: "8px" }} />
                    Back
                  </Button>

                  <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner /> Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </ButtonContainer>
              </Step>
            )}
          </StepContainer>
        </FormContainer>
      </Container>
      <ChatBot />
      <Footer />
    </>
  );
};

export default OpenAccount;
