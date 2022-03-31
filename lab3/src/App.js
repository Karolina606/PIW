import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { useState } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Announcements from "./pages/Announcements";
import NoPage from "./pages/NoPage";
import AddForm from './pages/AddForm';
import MessageSender from "./pages/MessageSender";
import GroupAnnouncements from './pages/GroupAnnouncements';
import GroupAddForm from './pages/GroupAddForm';

function App() {
    const [adds, setAdds] = useState({
        all:[{add_class_name:"PIWo", add_student_name:"Maciek K.", add_description:"Szukam osoby chętnej do wspólnej pracy przy projekcie z PIW. Zapraszam również na PIWo.", add_tags:"PIW, PIWo, JS, CSS, HTML", add_email:"maciek@cos.pl"},
        {add_class_name:"UCiSW2", add_student_name:"Robert N.", add_description:"Nie umiem w układy cyfrowe, dlatego szukam kompetentnej dobrej duszy.", add_tags:"UCiSW, ucisk, VHDL", add_email:"robert.k@gm.com"},
        {add_class_name:"SO2", add_student_name:"Julia F.", add_description:"Chcę synchronizować z Tobą swoje wątki", add_tags:"SO2, systemy operacyjne, procesy, wątki", add_email:"julia.f@cos.pl"},
        {add_class_name:"Algebra", add_student_name:"Błażej F.", add_description:"Program pomagający w algebrze.", add_tags:"algebra, matma, matematyka", add_email:"blazej.f@cos.pl"},
        {add_class_name:"BD2", add_student_name:"Miłosz Sz.", add_description:"Do zrobienia jest nowa baza danych dla ZUS.", add_tags:"bazy danych, oracle, sql", add_email:"milosz.f@cos.pl"},
        ],

        all_to_show:[{add_class_name:"PIWo", add_student_name:"Maciek K.", add_description:"Szukam osoby chętnej do wspólnej pracy przy projekcie z PIW. Zapraszam również na PIWo.", add_tags:"PIW, PIWo, JS, CSS, HTML", add_email:"maciek@cos.pl"},
        {add_class_name:"UCiSW2", add_student_name:"Robert N.", add_description:"Nie umiem w układy cyfrowe, dlatego szukam kompetentnej dobrej duszy.", add_tags:"UCiSW, ucisk, VHDL", add_email:"robert.k@gm.com"},
        {add_class_name:"SO2", add_student_name:"Julia F.", add_description:"Chcę synchronizować z Tobą swoje wątki", add_tags:"SO2, systemy operacyjne, procesy, wątki", add_email:"julia.f@cos.pl"},
        {add_class_name:"Algebra", add_student_name:"Błażej F.", add_description:"Program pomagający w algebrze.", add_tags:"algebra, matma, matematyka", add_email:"blazej.f@cos.pl"},
        {add_class_name:"BD2", add_student_name:"Miłosz Sz.", add_description:"Do zrobienia jest nowa baza danych dla ZUS.", add_tags:"bazy danych, oracle, sql", add_email:"milosz.f@cos.pl"},
        ],
    });


    const [groupAdds, setGroupAdds] = useState({
        all:[
            
            {add_class_name:"RiPO", 
            add_students:[
                {name:"Kola K.", email:"kol23@cos.pl"}, 
                {name:"Michał W.", email:"mich23@cos.pl"},
                {name:"Monika F.", email:"mon23@cos.pl"},
                {name:"Robert F.", email:"rob23@cos.pl"}],
            add_description:"Jesteśmy słabi, szukamy bohatera który nas uratuje.", 
            add_tags:"RIPO, RiPO, python, android"},

            {add_class_name:"PIWo", 
            add_students:[
                {name:"Maciek K.", email:"maciek23@cos.pl"}, 
                {name:"Justyna K.", email:"just3@cos.pl"}],
            add_description:"Wspólnie na pewno coś zdziałamy.", 
            add_tags:"PIW, PIWo, JS, CSS, HTML"},

            {add_class_name:"UCiSW2", 
            add_students:[
                {name:"Jan K.", email:"jan23@cos.pl"}, 
                {name:"Jola K.", email:"jol23@cos.pl"},
                {name:"Rafał F.", email:"raf23@cos.pl"}],
            add_description:"Jesteśmy słabi, szukamy bohatera który nas uratuje.", 
            add_tags:"UCiSW2, ucisw, vhdl, uklady cyfrowe"},

        ],
        all_to_show:[

            {add_class_name:"RiPO", 
            add_students:[
                {name:"Kola K.", email:"kol23@cos.pl"}, 
                {name:"Michał W.", email:"mich23@cos.pl"},
                {name:"Monika F.", email:"mon23@cos.pl"},
                {name:"Robert F.", email:"rob23@cos.pl"}],
            add_description:"Jesteśmy słabi, szukamy bohatera który nas uratuje.", 
            add_tags:"RIPO, RiPO, python, android"},

            {add_class_name:"PIWo", 
            add_students:[
                {name:"Maciek K.", email:"maciek23@cos.pl"}, 
                {name:"Justyna K.", email:"just3@cos.pl"}],
            add_description:"Wspólnie na pewno coś zdziałamy.", 
            add_tags:"PIW, PIWo, JS, CSS, HTML"},

            {add_class_name:"UCiSW2", 
            add_students:[
                {name:"Jan K.", email:"jan23@cos.pl"}, 
                {name:"Jola K.", email:"jol23@cos.pl"},
                {name:"Rafał F.", email:"raf23@cos.pl"}],
            add_description:"Jesteśmy słabi, szukamy bohatera który nas uratuje.", 
            add_tags:"UCiSW2, ucisw, vhdl, uklady cyfrowe"},
        ]
    });


    return ( <>
        <h1 id="page-header">Samotny? Znajdź swoją grupę projektową!</h1>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Layout />}>
                      <Route path="announcements" element={<Announcements announcementsState={adds} setAdds={setAdds}  />} />
                      <Route path="addForm" element={<AddForm announcementsState={adds} setAdds={setAdds} />} />
                      <Route path="sendMessage" element={<MessageSender />} />
                      <Route path="groupAnnouncements" element={<GroupAnnouncements groupAnnouncementsState={groupAdds} setGroupAdds={setGroupAdds} />} />
                      <Route path="groupAddForm" element={<GroupAddForm groupAdds={groupAdds} setGroupAdds={setGroupAdds}/>} />
                      <Route path="*" element={<NoPage />} />
                  </Route>
              </Routes>
          </BrowserRouter>
      </>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
export default App;