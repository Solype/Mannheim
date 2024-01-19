import xml.dom.minidom as dom
import csv

list_attributes_names = ("Resistance", "Force", "Agilite", "Dexterite", "Vivacite", "Intellect", "Social")
list_trait_names = ("Humanoide", "Empathique", "Civilise", "Magique", "Mobile", "Volant", "Mort-vivant", "Organique")

list_competences = [
    {"name" : "Deplacement", "stats" : ("Acrobatie", "Course", "Equilibre", "Equitation", "Escalade", "Esquive", "Nage", "Navigation", "Réception", "Saut", "Vol")},
    {"name" : "A distance", "stats" : ("Arc", "Arbalete", "Arme exotique", "Petit projectile", "Pistolet")},
    {"name" : "Artillerie", "stats" : ("Canon", "Engin")},
    {"name" : "Corps a corps", "stats" : ("Arme d'hast", "Arme exotique", "Contondante", "Courte lame", "Epee", "Hache", "Sabre", "Main nue")},
    {"name" : "Protectrice", "stats" : ("Bouclier")},
    {"name" : "Resistances", "stats" : ("Endurance", "Mentale", "Pathologique", "Physique")},
    {"name" : "Survie", "stats" : ("Crochetage", "Discretion", "Orientation", "Peche", "Pistage", "Reflexe", "Soulevement")},
    {"name" : "Sociale", "stats" : ("Dressage", "Imposture", "Intimidation", "Persuasion", "Psychologie", "Parole")},
    {"name" : "Intellect", "stats" : ("Concentration", "Deduction", "Memoire", "Observation")},
    {"name" : "Artisanat", "stats" : ("Art plastique", "Chimie", "Construction", "Cuisine", "Explosif", "Forge", "Medecine", "Musique")},
    {"name" : "Magie", "stats" : ("Alchimie", "Amelioration", "Annihilation", "Conjuration", "Elementarisme", "Enchantement", "Illusionnisme", "Invocation", "Necromancie", "Perception", "Scellement")},
]

def get_line_id(lines : list, start : str) -> int :
    len_start = len(start)

    for i in range(len(lines)) :
        if lines[i][:len_start] == start :
            return i
    return -1

def get_code(type, name = "") -> str :
    dico = {"monster skill id" : "RP-PAE-I-", "monster id" : "RP-EBE-I-"}

    new_code = dico[type]
    count = 1
    file = open("monster_attack_code.csv", "r",newline="")
    csv_lines = csv.reader(file, delimiter=",")
    for row in csv_lines :
        if row[1] == name :
            file.close()
            return row[0]

        if row[0][:len(new_code)] == new_code :
            count += 1

    file.close()
    counter_str = str(count)
    for i in range(len(counter_str), 3) :
        counter_str = "0" + counter_str
    new_code += counter_str
    file = open("monster_attack_code.csv", "a")
    file.write(f"{new_code},{name}\n")
    file.close()
    return new_code

def build_doc_header(lines : list[str]) -> dom.Document :
    name = lines[get_line_id(lines, "Nom")][4:]
    entity_code = get_code("monster id", name)

    document = dom.Document()
    entity = document.createElement("entity")
    document.appendChild(entity)
    ident_section = document.createElement("identSection")
    entity.appendChild(ident_section)
    name_code = document.createElement("nameCode")
    name_code.setAttribute("projectCode", "RP")
    name_code.setAttribute("chapterCode", entity_code[3])
    name_code.setAttribute("sectionCode", entity_code[4:6])
    name_code.setAttribute("typeCode", entity_code[7])
    name_code.setAttribute("identCode", entity_code[9:])
    ident_section.appendChild(name_code)
    entity_name = document.createElement("entityName")
    entity_name.appendChild(document.createTextNode(name))
    ident_section.appendChild(entity_name)
    lang = document.createElement("lang")
    lang.setAttribute("country", "FR")
    lang.setAttribute("lang", "fr")
    ident_section.appendChild(lang)
    return document


def create_section(document : dom.Document, parent : dom.Element, title_value : str) -> dom.Element :
    section = document.createElement("section")
    title = document.createElement("title")
    title.appendChild(document.createTextNode(title_value))
    section.appendChild(title)
    parent.appendChild(section)
    return section

def create_traits(lines : list[str], document : dom.Document, core_section : dom.Element) :
    section = create_section(document, core_section, "trait")
    list_xml = document.createElement("list")
    section.appendChild(list_xml)
    for ele in list_trait_names :
        elem = document.createElement("listElem")
        list_xml.appendChild(elem)
        status = document.createElement("status")
        elem.appendChild(status)
        status.setAttribute("name", ele)
        status.setAttribute("value", "false")
        id_line = get_line_id(lines, ele)
        if (id_line != -1 and lines[id_line][-1] != "X") :
            status.setAttribute("value", "true")

def create_xml_simple_list_of_stat(lines : list[str], document : dom.Document, parent : dom.Element, elems : dict) :
    name = elems["name"]
    section = create_section(document, parent, name)
    parent.appendChild(section)

    list_xml = document.createElement("list")
    section.appendChild(list_xml)
    for ele in elems["stats"] :
        id_line_attribute = get_line_id(lines, ele)
        if id_line_attribute != -1 :
            list_elem = document.createElement("listElem")
            list_xml.appendChild(list_elem)
            stat = document.createElement("stat")
            list_elem.appendChild(stat)
            stat.setAttribute("nameId", ele)
            stat.setAttribute("value", str(int(lines[id_line_attribute][len(ele):])))
    return

def change_names_in_doc(texte : str) :
    texte = texte.replace("é", "e").replace("è", "e").replace("ï", "i").replace("arc", "Arc").replace("à", "a").replace("É", "E")
    return texte

def convert_monster_text_to_xml(texte : str) :
    doc_modified_name = change_names_in_doc(texte)
    lines = doc_modified_name.splitlines(False)
    document = build_doc_header(lines)
    root = document.firstChild
    core_section = document.createElement("section")
    root.appendChild(core_section)
    create_traits(lines, document, core_section)
    create_xml_simple_list_of_stat(lines, document, core_section, {"name" : "Attributs", "stats" : list_attributes_names})
    competences = create_section(document, core_section, "Competence")
    for ele in list_competences :
        if  get_line_id(lines, "\t" + ele["name"]) != -1 :
            create_xml_simple_list_of_stat(lines, document, competences, ele)
    # print(document.toprettyxml())
