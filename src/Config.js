export default class Config {
  static options = [
    { id: 'devops', label: 'DevOps' }, 
    { id: 'webappse', label: 'Web/App Software Engineering' }, 
    { id: 'embeddedse', label: 'Embedded Software Engineering' },
    { id: 'bigdata', label: 'Big Data' },
    { id: 'ai', label: 'Artificial Intelligence and Machine Learning' },
    { id: 'network', label: 'Network Engineering' },
    { id: 'security', label: 'IT Security' },
    { id: 'hardware', label: 'Computer Hardware' },
    { id: 'serverclient', label: 'Server/Client Systems Engineering' },
    { id: 'ppm', label: 'Project and Process Management' },
    { id: 'cloud', label: 'Cloud Computing' },
    { id: 'beer', label: 'Bier' },
  ];

  static getLabelById = (id) => {
    return Config.options.filter(opt => opt.id === id).map(opt => opt.label)[0];
  };
}