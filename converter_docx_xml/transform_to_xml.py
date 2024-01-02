import xml.dom.minidom as dom
import csv

def get_line_id(lines : list, start : str) -> int :
    len_start = len(start)

    for i in range(len(lines)) :
        if lines[i][:len_start] == start :
            return i
    return -1

def get_code(type, name) -> str :
    dico = {"monster power id" : "RP-PAE-I-", "monster id" : "RP-EBE-I-"}

    new_code = dico[type]
    count = 1
    file = open("monster_attack_code.csv", "r",newline="")
    csv_lines = csv.reader(file, delimiter=",")
    for row in csv_lines :
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


def create_section(document : dom.Document, core_section : dom.Element, title_value : str) -> dom.Element :
    section = document.createElement("section")
    title = document.createElement("title")
    title.appendChild(document.createTextNode(title_value))
    section.appendChild(title)
    core_section.appendChild(section)
    return section

def create_traits(lines : list[str], document : dom.Document, core_section : dom.Element) :
    list_trait = ["Humanoïde", "Empathique", "Civilisé", "Doué magiquement", "Mobile", "Volant", "Mort-Vivant", "Organique"]
    list_internal_name = ["Humanoide", "Empathique", "Civilise", "Magique", "Mobile", "Volant", "Mort-vivant", "Organique"]

    section = create_section(document, core_section, "trait")
    list_xml = document.createElement("list")
    section.appendChild(list_xml)
    for i in range(len(list_trait)) :
        elem = document.createElement("listElem")
        list_xml.appendChild(elem)
        status = document.createElement("status")
        elem.appendChild(status)
        status.setAttribute("name", list_internal_name[i])
        status.setAttribute("value", "false")
        id_line = get_line_id(lines, list_trait[i])
        if (id_line != -1 and lines[id_line][-1] != "X") :
            status.setAttribute("value", "true")

def create_attributes(lines : list[str], document : dom.Document, core_section : dom.Element) :
    list_attributes = ["Résistance", "Force", "Agilité", "Dextérité", "Vivacité", "Intellect", "Social"]
    list_attributes_names = ["Resistance", "Force", "Agilite", "Dexterite", "Vivacite", "Intellect", "Social"]

    section = create_section(document, core_section, "Attributs")
    list_xml = document.createElement("list")
    section.appendChild(list_xml)
    

def convert_monster_text_to_xml(texte : str) :
    lines = texte.splitlines(False)
    document = build_doc_header(lines)
    root = document.firstChild
    core_section = document.createElement("section")
    root.appendChild(core_section)
    create_traits(lines, document, core_section)

    print(document.toprettyxml())

