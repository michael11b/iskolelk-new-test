import { getALPapers, getOLPapers, getScholarshipPapers } from '@/actions/papers';
import http from '@/utils/https';
import { useEffect, useState } from 'react';

// Hook for fetching AL papers by stream and subject only (for language selection screen)
export const useALPapersByStreamSubject = (stream, subject) => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!stream || !subject) {
      setPapers([]);
      return;
    }

    const fetchPapers = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {
          examType: 'al',
          stream,
          subject,
          limit: 200,
        };
        console.log('useALPapersByStreamSubject fetching with params:', params);
        const response = await http.get('/papers', { params });
        const papersData = response.data.data?.data || [];
        console.log('useALPapersByStreamSubject received data:', papersData);
        setPapers(papersData);
      } catch (err) {
        console.error('useALPapersByStreamSubject error:', err);
        setError(err.message || 'Failed to fetch papers');
        setPapers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, [stream, subject]);

  return { papers, loading, error };
};

// Hook for fetching OL papers by subject only (for language selection screen)
export const useOLPapersBySubject = (subject) => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!subject) {
      setPapers([]);
      return;
    }

    const fetchPapers = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {
          examType: 'ol',
          subject,
          limit: 200,
          };
        console.log('useOLPapersBySubject fetching with params:', params);
        const response = await http.get('/papers', { params });
        const papersData = response.data.data?.data || [];
        console.log('useOLPapersBySubject received data:', papersData);
        setPapers(papersData);
      } catch (err) {
        console.error('useOLPapersBySubject error:', err);
        setError(err.message || 'Failed to fetch papers');
        setPapers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, [subject]);

  return { papers, loading, error };
};

// Hook for fetching Scholarship papers by language only (for year selection screen)
export const useScholarshipPapersByLanguage = (language) => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // if (!language) {
    //   setPapers([]);
    //   return;
    // }

    const fetchPapers = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {
          examType: 'scholarship',
          // medium: language,
          limit: 200,
        };
        console.log('useScholarshipPapersByLanguage fetching with params:', params);
        const response = await http.get('/papers', { params });
        const papersData = response.data.data?.data || [];
        console.log('useScholarshipPapersByLanguage received data:', papersData);
        setPapers(papersData);
      } catch (err) {
        console.error('useScholarshipPapersByLanguage error:', err);
        setError(err.message || 'Failed to fetch papers');
        setPapers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, [language]);

  return { papers, loading, error };
};

// Hook for fetching AL papers
export const useALPapers = (stream, subject, language, year) => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!stream || !subject || !language || !year) {
      setPapers([]);
      return;
    }

    const fetchPapers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getALPapers(stream, subject, language, year);
        console.log('useALPapers received data:', data);
        console.log('useALPapers papers length:', data.length);
        setPapers(data);
      } catch (err) {
        console.error('useALPapers error:', err);
        setError(err.message || 'Failed to fetch papers');
        setPapers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, [stream, subject, language, year]);

  return { papers, loading, error };
};

// Hook for fetching OL papers
export const useOLPapers = (subject, language, year) => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!subject || !language || !year) {
      setPapers([]);
      return;
    }

    const fetchPapers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getOLPapers(subject, language, year);
        console.log('useOLPapers received data:', data);
        console.log('useOLPapers papers length:', data.length);
        setPapers(data);
      } catch (err) {
        console.error('useOLPapers error:', err);
        setError(err.message || 'Failed to fetch papers');
        setPapers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, [subject, language, year]);

  return { papers, loading, error };
};

// Hook for fetching Scholarship papers
export const useScholarshipPapers = (language, year) => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log('useScholarshipPapers language:', language);
  console.log('useScholarshipPapers year:', year);

  useEffect(() => {
    if (!language || !year) {
      setPapers([]);
      return;
    }

    const fetchPapers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getScholarshipPapers(language, year);
        console.log('useScholarshipPapers received data:', data);
        console.log('useScholarshipPapers papers length:', data.length);
        setPapers(data);
      } catch (err) {
        console.error('useScholarshipPapers error:', err);
        setError(err.message || 'Failed to fetch papers');
        setPapers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, [language, year]);

  return { papers, loading, error };
};
