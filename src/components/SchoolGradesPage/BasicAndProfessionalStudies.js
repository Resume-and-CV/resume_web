import React from 'react'
import styles from './css/BasicAndProfessionalStudies.module.css'
import schoolGradeStyles from './css/schoolGrades.module.css'
import { useTranslation } from 'react-i18next'

const BasicAndProfessionalStudies = ({ courses }) => {
  const { t } = useTranslation()

  return (
    <div>
      <h2>{t('basicAndProfessionalStudies')}</h2>
      <div className={schoolGradeStyles.scrollableTable}>
        {courses.length > 0 ? (
          <table className={schoolGradeStyles.entryBox}>
            <thead>
              <tr>
                <th className={`${styles.label} ${styles.courseCodeLabel}`}>
                  {t('courseCode')}
                </th>
                <th className={`${styles.label} ${styles.courseNameLabel}`}>
                  {t('courseName')}
                </th>
                <th className={`${styles.label} ${styles.creditsLabel}`}>
                  {t('credits')}
                </th>
                <th className={`${styles.label} ${styles.gradeLabel}`}>
                  {t('grade')}
                </th>
                <th className={`${styles.label} ${styles.typeLabel}`}>
                  {t('courseType')}
                </th>
                <th className={`${styles.label} ${styles.completionDateLabel}`}>
                  {t('courseCompletionDate')}
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((data, index) => (
                <tr key={index}>
                  <td className={`${styles.value} ${styles.course_codeValue}`}>
                    {data.course_code}
                  </td>
                  <td className={`${styles.value} ${styles.courseNameValue}`}>
                    {data.course_name}
                  </td>
                  <td className={`${styles.value} ${styles.creditsValue}`}>
                    {data.credits}
                  </td>
                  <td className={`${styles.value} ${styles.gradeValue}`}>
                    {data.grade}
                  </td>
                  <td className={`${styles.value} ${styles.typeValue}`}>
                    {data.type}
                  </td>
                  <td className={`${styles.value} ${styles.completion_date}`}>
                    {data.completion_date
                      ? new Date(data.completion_date).toLocaleDateString(
                          'fi-FI',
                        )
                      : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={schoolGradeStyles.noData}>
            No courses found. Please check back later.
          </p>
        )}
      </div>
    </div>
  )
}

export default BasicAndProfessionalStudies
