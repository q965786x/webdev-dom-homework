 export const formatDate = () => {
      const date = new Date();
      return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(',', '');
    };
    

  export const sanitizeHtml = (value) => {
    return value.replaceAll('<', '&lt;') .replaceAll('>', '&gt;');  
    };
  