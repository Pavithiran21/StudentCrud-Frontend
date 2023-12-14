import React from "react";
import Modal from "react-bootstrap/Modal";
import { Field, Form, Formik } from "formik";
import Button from "react-bootstrap/esm/Button";
import { toast } from 'react-toastify';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

import * as yup from "yup";
import axios from "axios";
import { API } from "../../Utils/ApiRoute";
import { useNavigate } from "react-router-dom";

export const AddStudent = (props) => {

  const Navigate = useNavigate();
  const handleClose = () => props.setShow(false);

  
  const isAtLeast14YearsOld = (value) => {
    const currentDate = new Date();
    const birthDate = new Date(value);
    const minDate = new Date().setFullYear(currentDate.getFullYear() - 14);
  
    return birthDate <= minDate;
  };

  const validate = yup.object({
    studentname: yup.string().min(3, "Must be 6 characters or more").required("StudentName is required"),
    dob: yup.date()
    .max(new Date(), 'Date of Birth cannot be in the future')
    .test('is-at-least-14-years-old', 'Must be at least 14 years old', isAtLeast14YearsOld)
    .required('Date of Birth is required'),
    email: yup.string().email("Email is invalid").required("Email is required"),
    phone: yup.string().matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Invalid Phone number").required('Phone Number is required'),
    reg_no: yup.string().matches(/^[0-9]{7}$/, 'Invalid registration number. Only numbers are allowed.').required('Registration number is required'),
    gender: yup.string().required('Gender is required.Please Select one'),
    subject1: yup.number().max(100).min(0).required("Subject 1 mark is required"),
    subject2: yup.number().max(100).min(0).required("Subject 2 mark is required"),
    subject3: yup.number().max(100).min(0).required("Subject 3 mark is required"),
    subject4: yup.number().max(100).min(0).required("Subject 4 mark is required"),
    subject5: yup.number().max(100).min(0).required("Subject 5 mark is required"),
  });
  


  const SubmitStudent = (data) => {
    axios.post(`${API}/api/student/create-student`, data, {
      headers: {
        authorization:window.localStorage.getItem('token'),
      },
    })
      .then((response) => {
        console.log(response.data);
        if(response.data.status){
          toast.success("Student Details Added Successfully");
          Navigate('/admin-dashboard');
        }
        else if(!response.data.status){
          toast.error("Student Details Already Added. Please create new Student Profile ");
          Navigate('/all-student');

        }
        else{
          toast.error("User are not allowed to create Profile");
          Navigate('/');
        }
        
        // Perform additional logic here if needed
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong. Please check it!");
        // Perform error handling logic here if needed
      });
  };

 
  


  return (
    <>
      <Modal show={props.show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>Add Student Details</Modal.Title>
          <Button variant="white" onClick={handleClose}>
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{studentname: "",dob: "",phone: "",email: "",gender: "",reg_no: "",subject1: "",subject2: "",
              subject3: "",subject4: "",subject5: ""
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              // console.log(values);
              let data = {
                studentname: values.studentname,
                dob: values.dob,
                phone: values.phone,
                email: values.email,
                gender: values.gender,
                reg_no: values.reg_no,
                subject1: values.subject1,
                subject2: values.subject2,
                subject3: values.subject3,
                subject4: values.subject4,
                subject5: values.subject5,
                
              };
              SubmitStudent(data);
             
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Row>
                  <Col>
                    <div className="">
                      <label>Student Name</label>
                      <Field
                        name="studentname"
                        className={`form-control ${
                          errors.studentname && touched.studentname ? "is-invalid" : ""
                        }`}
                        type="text"
                        required
                      />
                      {errors.studentname && touched.studentname && (
                        <div className="invalid-feedback">{errors.studentname}</div>
                      )}
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <label>Date of Birth</label>
                      <Field
                        name="dob"
                        className={`form-control ${errors.dob && touched.dob ? "is-invalid" : ""}`}
                        type="date"
                        required
                      />
                      {errors.dob && touched.dob && <div className="invalid-feedback">{errors.dob}</div>}
                    </div>
                  </Col>
                  
                  <Col>
                    <div>
                      <label>Student Registration Number</label>
                      <Field
                        name="reg_no"
                        className={`form-control ${
                          errors.reg_no && touched.reg_no ? "is-invalid" : ""
                        }`}
                        type="text"
                        required
                      />
                      {errors.reg_no && touched.reg_no && (
                        <div className="invalid-feedback">{errors.reg_no}</div>
                      )}
                    </div>
                  </Col>
                 
                </Row>
                <Row>
                <Col>
                    <div>
                      <label>Email</label>
                      <Field
                        name="email"
                        className={`form-control ${errors.email && touched.email ? "is-invalid" : ""}`}
                        type="email"
                        required
                      />
                      {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                  </Col>
                  
                  <Col >
                  <div >
                    <label>Gender</label>
                    <Field  name="gender" as="select"  className={`form-control  ${errors.gender && touched.gender ? 'is-invalid' : ''}`} required>
                      <option>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Field>
                    {errors.gender && touched.gender && <div className="invalid-feedback">{errors.gender}</div>}
                  </div>
                  </Col>
                  
                 
                </Row>
                <Row>
                  <Col sm="4">
                    <div className="">
                      <label>Phone Number</label>
                      <Field
                        name="phone"
                        className={`form-control ${
                          errors.phone && touched.phone ? "is-invalid" : ""
                        }`}
                        type="text"
                        required
                      />
                      {errors.phone && touched.phone && (
                        <div className="invalid-feedback">{errors.phone}</div>
                      )}
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <label>Subject 1</label>
                      <Field
                        name="subject1"
                        className={`form-control ${errors.subject1 && touched.subject1 ? "is-invalid" : ""}`}
                        type="text"
                        required
                      />
                      {errors.subject1 && touched.subject1 && <div className="invalid-feedback">{errors.subject1}</div>}
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <label>Subject 2</label>
                      <Field
                        name="subject2"
                        className={`form-control ${errors.subject2 && touched.subject2 ? "is-invalid" : ""}`}
                        type="text"
                        required
                      />
                      {errors.subject2 && touched.subject2 && <div className="invalid-feedback">{errors.subject2}</div>}
                    </div>
                  </Col>
                 
                </Row>
                <Row>
                  <Col>
                    <div className="">
                      <label>Subject 3</label>
                      <Field
                        name="subject3"
                        className={`form-control ${
                          errors.subject3 && touched.subject3 ? "is-invalid" : ""
                        }`}
                        type="text"
                        required
                      />
                      {errors.subject3 && touched.subject3 && (
                        <div className="invalid-feedback">{errors.subject3}</div>
                      )}
                    </div>
                  </Col>
                  <Col sm="4">
                    <div>
                      <label>Subject 4</label>
                      <Field
                        name="subject4"
                        className={`form-control ${errors.subject4 && touched.subject4 ? "is-invalid" : ""}`}
                        type="text"
                        required
                      />
                      {errors.subject4 && touched.subject4 && <div className="invalid-feedback">{errors.subject4}</div>}
                    </div>
                  </Col>
                  <Col sm="4">
                    <div>
                      <label>Subject 5</label>
                      <Field
                        name="subject5"
                        className={`form-control ${errors.subject5 && touched.subject5 ? "is-invalid" : ""}`}
                        type="text"
                        required
                      />
                      {errors.subject5 && touched.subject5 && <div className="invalid-feedback">{errors.subject5}</div>}
                    </div>
                  </Col>
                 
                </Row>
                
                <Col>
                  <Button type="submit" variant="outline-success" className="m-2 addstudent">
                    Add
                  </Button>
                  <Button type="reset" variant="outline-danger" className="m-2 addstudent">
                    Reset
                  </Button>
                </Col>
                
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};




