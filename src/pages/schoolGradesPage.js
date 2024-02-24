import React, { useState, useEffect } from 'react'

import mainBoxStyles from './css/mainBoxStyles.module.css'
import Header from '../components/Header'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import styles from './css/schoolGrades.module.css'

const SchoolGradesPage = () => {
  let { state } = useLocation()
  let education_id = state.education_id
  const { t } = useTranslation()
  const { i18n } = useTranslation()

  const [courses, setCourses] = useState([])
  const [exemptions, setExemptions] = useState([])

  useEffect(() => {
    const getCoursesAndExemptions = async () => {
      try {
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            'Accept-Language': i18n.language,
            Authorization: `Bearer ${token}`,
          },
        }

        // Fetch courses
        const coursesResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/education/courses`,
          { ...config, params: { education_id } },
        )
        const fetchedCourses = coursesResponse.data
        setCourses(fetchedCourses)

        // Fetch exemptions for each course
        const exemptionsPromises = fetchedCourses.map((course) =>
          axios
            .get(
              `${process.env.REACT_APP_SERVER_URL}/education/exemptions/?course_id=${course.course_id}`,
              config,
            )
            .then((response) => ({
              course_id: course.course_id,
              exemptions: response.data,
            }))
            .catch((error) => {
              return { course_id: course.course_id, exemptions: [] } // Return an empty array for this course in case of an error
            }),
        )

        // Await all the exemption fetch promises
        const exemptionsForCourses = await Promise.all(exemptionsPromises)

        // Reduce the resolved promises to accumulate exemptions
        const exemptionsObject = exemptionsForCourses.reduce((acc, current) => {
          acc[current.course_id] = current.exemptions
          return acc
        }, {})

        setExemptions(exemptionsObject)
      } catch (error) {
        console.error('Error fetching courses or exemptions:', error)
      }
    }

    getCoursesAndExemptions()
  }, [i18n.language, education_id])

  // Function to render exemptions table rows
  const renderExemptionsRows = () => {
    return Object.values(exemptions)
      .flat()
      .map((data, index) => (
        <tr key={index}>
          <td className={{ ...styles.value, ...styles.institutionValue }}>
            {data.original_institution}
          </td>
          <td className={{ ...styles.value, ...styles.courseNameValue }}>
            {data.original_course_name}
          </td>
          <td className={styles.value}>{data.original_credits}</td>
          <td className={styles.value}>{data.grade}</td>
          <td className={styles.value}>{data.type}</td>
          <td className={styles.value}>
            {data.completion_date
              ? new Date(data.completion_date).toLocaleDateString('fi-FI')
              : ''}
          </td>
        </tr>
      ))
  }

  return (
    <div>
      <Header />
      <div className={mainBoxStyles.mainBox}>
        <div className={styles.box}>
          <h1 className={styles.heading}>{t('grade_information')}</h1>

          {/* Subheading for Courses */}
          <h2>{t('basicAndProfessionalStudies')}</h2>
          {courses.length > 0 ? (
            <div>
              <div className={styles.entryBox}>
                <div className={`${styles.label} ${styles.courseCodeLabel}`}>
                  {t('courseCode')}
                </div>
                <div className={`${styles.label} ${styles.courseNameLabel}`}>
                  {t('courseName')}
                </div>
                <div className={`${styles.label} ${styles.creditsLabel}`}>
                  {t('credits')}
                </div>
                <div className={`${styles.label} ${styles.gradeLabel}`}>
                  {t('grade')}
                </div>
                <div className={`${styles.label} ${styles.typeLabel}`}>
                  {t('courseType')}
                </div>
                <div
                  className={`${styles.label} ${styles.completionDateLabel}`}
                >
                  {t('courseCompletionDate')}
                </div>
              </div>
              {courses.map((data, index) => (
                <div key={index} className={styles.entryBox}>
                  <div className={`${styles.value} ${styles.course_codeValue}`}>
                    {data.course_code}
                  </div>
                  <div className={`${styles.value} ${styles.courseNameValue}`}>
                    {data.course_name}
                  </div>
                  <div className={`${styles.value} ${styles.creditsValue}`}>
                    {data.credits}
                  </div>
                  <div className={`${styles.value} ${styles.gradeValue}`}>
                    {data.grade}
                  </div>
                  <div className={`${styles.value} ${styles.typeValue}`}>
                    {data.type}
                  </div>
                  <div className={`${styles.value} ${styles.completion_date}`}>
                    {data.completion_date
                      ? new Date(data.completion_date).toLocaleDateString(
                          'fi-FI',
                        )
                      : ''}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noData}>
              No courses found. Please check back later.
            </p>
          )}
          {/* Subheading for Exemptions */}
          {/* 
          <h2>{t('recognitionOfStudies')}</h2>
          {Object.keys(exemptions).length > 0 &&
          Object.values(exemptions).flat().length > 0 ? (
            <table className={styles.entryBox}>
              <thead>
                <tr>
                  <th className={styles.label}>{t('institution')}</th>
                  <th className={styles.label}>{t('courseName')}</th>
                  <th className={styles.label}>{t('credits')}</th>
                  <th className={styles.label}>{t('grade')}</th>
                  <th className={styles.label}>{t('courseType')}</th>
                  <th className={styles.label}>{t('courseCompletionDate')}</th>
                </tr>
              </thead>
              <tbody>{renderExemptionsRows()}</tbody>
            </table>
          ) : (
            <p className={styles.noData}>
              No exemptions found. Please check back later.
            </p>
          )}              */}
        </div>
      </div>
    </div>
  )
}
export default SchoolGradesPage
