import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import warnigIcon from '../../assets/icons/warning.svg';
import './styles.css';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '8:00 AM', to: '4:00 PM' },
  ]);

  const addNewScheduleItem = () => {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  };

  const handleCreateClass = (e: FormEvent) => {
    e.preventDefault();

    api
      .post('classes', {
        name,
        avatar,
        whatsapp,
        bio,
        cost: Number(cost),
        subject,
        schedule: scheduleItems,
      })
      .then(() => {
        alert('Cadastro realizado com sucesso');
        history.push('/');
      })
      .catch(() => {
        alert('Erro no cadastro');
      });

    console.log({ name, avatar, whatsapp, bio, subject, cost });
  };

  const setScheduleItemValue = (
    position: Number,
    field: string,
    value: string
  ) => {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }
      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  };

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas"
        description="O primeiro passo é preencher o formulário de inscrição"
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome Completo"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(event) => setAvatar(event.target.value)}
            />
            <Input
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={(event) => setWhatsapp(event.target.value)}
            />
            <TextArea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
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
            <Input
              name="cost"
              label="Custo da sua aula por hora"
              value={cost}
              onChange={(event) => setCost(event.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>
              Hoários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo Horário
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    value={scheduleItem.week_day}
                    name="week_day"
                    label="Dia da semana"
                    onChange={(e) =>
                      setScheduleItemValue(index, 'week_day', e.target.value)
                    }
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
                        label: 'Sexta-feira',
                      },
                      {
                        value: '7',
                        label: 'Sábado',
                      },
                    ]}
                  />
                  <Input
                    value={scheduleItem.from}
                    name="from"
                    label="Das"
                    type="time"
                    onChange={(e) =>
                      setScheduleItemValue(index, 'from', e.target.value)
                    }
                  />

                  <Input
                    value={scheduleItem.to}
                    name="to"
                    label="Até"
                    type="time"
                    onChange={(e) =>
                      setScheduleItemValue(index, 'to', e.target.value)
                    }
                  />
                </div>
              );
            })}
          </fieldset>
          <footer>
            <p>
              <img src={warnigIcon} alt="Aviso Importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar Cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
