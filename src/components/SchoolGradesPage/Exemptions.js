import React from 'react'
import styles from './css/Exemptions.module.css'
import { useTranslation } from 'react-i18next'
import schoolGradeStyles from './css/schoolGrades.module.css'

const Exemptions = ({ exemptions }) => {
  const { t } = useTranslation()

  return (
    <div>
      <h2>{t('recognitionOfStudies')}</h2>
      <div className={schoolGradeStyles.scrollableTable}>
        {Object.keys(exemptions).length > 0 &&
        Object.values(exemptions).flat().length > 0 ? (
          <table className={schoolGradeStyles.entryBox}>
            <thead>
              <tr>
                <th
                  className={`${styles.institutionLabel} ${styles.institutionValue}`}
                >
                  {t('institution')}
                </th>
                <th
                  className={`${styles.courseNameLabel} ${styles.courseNameValue}`}
                >
                  {t('courseName')}
                </th>
                <th className={`${styles.creditsLabel} ${styles.creditsValue}`}>
                  {t('credits')}
                </th>
                <th className={`${styles.typeLabel} ${styles.typeValue}`}>
                  {t('courseType')}
                </th>
                <th
                  className={`${styles.completionDateLabel} ${styles.completionDateValue}`}
                >
                  {t('courseCompletionDate')}
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.values(exemptions)
                .flat()
                .map((data, index) => (
                  <tr key={index}>
                    <td
                      className={`${styles.institutionLabel} ${styles.institutionValue}`}
                    >
                      {data.original_institution}
                    </td>
                    <td
                      className={`${styles.courseNameLabel} ${styles.courseNameValue}`}
                    >
                      {data.original_course_name}
                    </td>
                    <td
                      className={`${styles.creditsLabel} ${styles.creditsValue}`}
                    >
                      {data.original_credits}
                    </td>
                    <td className={`${styles.typeLabel} ${styles.typeValue}`}>
                      {data.type}
                    </td>
                    <td
                      className={`${styles.completionDateLabel} ${styles.completionDateValue}`}
                    >
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
            No exemptions found. Please check back later.
          </p>
        )}
      </div>
    </div>
  )
}

export default Exemptions
