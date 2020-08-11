import React from 'react';
import whatsappIcon from '../../assets/icons/whatsapp.svg';
import './styles.css';
import api from '../../services/api';

export interface Teacher {
  id: string;
  avatar: string;
  bio: string;
  cost: Number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const createNewConnection = () => {
    api.post('connection', { user_id: teacher.id });
  };
  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {teacher.cost}</strong>{' '}
        </p>
        <a
          href={`https://wa.me/${teacher.whatsapp}`}
          onClick={createNewConnection}
          target="_blank"
        >
          <img src={whatsappIcon} alt="Qhatsappp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
