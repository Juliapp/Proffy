import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';

import './styles.css';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');
  const [week_day, setweekDay] = useState('');
  const [time, setTime] = useState('');

  const searchTeachers = async (e: FormEvent) => {
    e.preventDefault();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setTeachers(response.data);
  };

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Esses são os proffys disponíveis">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              {
                value: 'Artes',
                label: 'Artes',
              },
              {
                value: 'Biologia',
                label: 'Biologia',
              },
              {
                value: 'Ciências',
                label: 'Ciências',
              },
              {
                value: 'Educação Física',
                label: 'Educação Física',
              },
              {
                value: 'Física',
                label: 'Física',
              },
              {
                value: 'Geografia',
                label: 'Geografia',
              },
              {
                value: 'História',
                label: 'História',
              },
              {
                value: 'Matemática',
                label: 'Matemática',
              },
              {
                value: 'Português',
                label: 'Português',
              },
              {
                value: 'Química',
                label: 'Química',
              },
            ]}
          />
          <Select
            value={week_day}
            name="week_day"
            label="Dia da semana"
            onChange={(e) => setweekDay(e.target.value)}
            options={[
              {
                value: '0',
                label: 'Domingo',
              },
              {
                value: '1',
                label: 'Segunda-feira',
              },
              {
                value: '3',
                label: 'Terça-feira',
              },
              {
                value: '4',
                label: 'Quarta-feira',
              },
              {
                value: '5',
                label: 'Quinta-feira',
              },
              {
                value: '6',
                label: 'Sábado',
              },
            ]}
          />
          <Input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            type="time"
            name="time"
            label="Hora"
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
};

export default TeacherList;
