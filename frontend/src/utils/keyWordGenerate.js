// utility to expand templates
function expandTemplate(template, filter) {
    return template
      .replace(/\${examType}/g, filter.examType || "")
      .replace(/\${stream}/g, filter.stream || "")
      .replace(/\${subject}/g, filter.subject || "")
      .replace(/\${language}/g, filter.language || "")
      .replace(/\${year}/g, filter.year || "");
  }
  
  function generateKeywords(section, filters) {
    let keywords = [];
  
    // handle static first
    if (section.static && Array.isArray(section.static)) {
      keywords.push(...section.static);
    }
  
    // handle dynamic
    if (section.dynamic && Array.isArray(section.dynamic)) {
      filters.streams.forEach(streamObj => {
        section.dynamic.forEach(template => {
          // expand subject + mediums + years
          streamObj.mediums.forEach(language => {
            streamObj.years.forEach(year => {
              keywords.push(
                expandTemplate(template, {
                  examType: filters.examType,
                  stream: streamObj.stream,
                  subject: streamObj.subject,
                  language,
                  year
                })
              );
            });
          });
        });
      });
    }
  
    return [...new Set(keywords)].join(", "); // dedupe + return string
  }
  
export default generateKeywords;