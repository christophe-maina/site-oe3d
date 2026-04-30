/* OE3D — i18n minimal (9 langues, fallback FR) */
(function () {
  const DICT = {
    fr: {
      lang_name: "Français",
      brand: "OE3D — Ortho Espace 3D",
      tagline: "L'appareillage sur mesure au service de votre autonomie",
      splash_choose: "Choisissez votre espace",
      porte_patient: "Patients & Curieux",
      porte_patient_desc: "Modes d'emploi, équipe, FAQ, prise de rendez-vous",
      porte_pro: "Professionnels de santé",
      porte_pro_desc: "Annuaire, outil de prescription, ressources",
      porte_enter: "Entrer →",
      nav_home: "Accueil",
      nav_team: "Équipe",
      nav_expertises: "Expertises",
      nav_modes: "Modes d'emploi",
      nav_faq: "FAQ",
      nav_contact: "Contact",
      nav_pro: "Espace Pro",
      nav_patient: "Espace Patient",
      hero_eyebrow: "📍 Remire-Montjoly · Guyane française",
      hero_title: "L'appareillage sur mesure au service de votre <span class=\"accent\">autonomie</span>",
      hero_subtitle: "Orthèses, prothèses et solutions d'impression 3D personnalisées. Une équipe dédiée, une approche humaine, un engagement éthique envers nos patients et notre territoire guyanais.",
      cta_appointment: "Prendre rendez-vous",
      cta_modes: "Voir les modes d'emploi",
      cta_3d: "Découvrir nos appareils en 3D",
      sec_team_eyebrow: "Notre équipe",
      sec_team_title: "Des professionnels à votre service",
      sec_team_subtitle: "Six métiers complémentaires au service de votre appareillage : conception, fabrication, application, suivi.",
      sec_expert_eyebrow: "Nos expertises",
      sec_expert_title: "Des solutions adaptées à chaque situation",
      sec_expert_subtitle: "Orthèses, prothèses, impression 3D et petit appareillage : un savoir-faire complet sous un même toit.",
      exp_orth_title: "Orthèses",
      exp_orth_desc: "Corsets, bottes, gouttières, orthèses de main, scoliose, posture nuit. Conception sur mesure et suivi.",
      exp_proth_title: "Prothèses",
      exp_proth_desc: "Prothèses de membres, prothèses mammaires, prothèses esthétiques, solutions électroniques.",
      exp_3d_title: "Impression 3D",
      exp_3d_desc: "Conception numérique et impression d'appareillages personnalisés, légers, ajustés au millimètre.",
      exp_petit_title: "Petit appareillage",
      exp_petit_desc: "Aides techniques, ceintures, bandages, semelles, accessoires d'autonomie au quotidien.",
      sec_3d_eyebrow: "Vues 3D interactives",
      sec_3d_title: "Explorez nos appareils sous tous les angles",
      sec_3d_subtitle: "Orientez, zoomez, observez. Bientôt enrichi avec nos propres scans 3D.",
      sec_modes_eyebrow: "Modes d'emploi",
      sec_modes_title: "Comment utiliser et entretenir vos appareils",
      sec_modes_subtitle: "Notices détaillées en plusieurs langues. Téléchargez ou consultez en ligne.",
      mode_botte: "Botte et gouttière",
      mode_botte_desc: "Notice d'utilisation et d'entretien des bottes de marche et gouttières de posture.",
      mode_coquille: "Coquille de verticalisation et de nuit",
      mode_coquille_desc: "Guide d'utilisation des coquilles : positionnement, réglages, précautions.",
      mode_lombo: "Corset lombostat / TLSO",
      mode_lombo_desc: "Mise en place, ajustement des sangles, entretien et durée de port.",
      mode_scoliose: "Corset de scoliose",
      mode_scoliose_desc: "Programme de port progressif, hygiène cutanée et surveillance.",
      mode_main: "Orthèse de main et de bras",
      mode_main_desc: "Positionnement, exercices complémentaires et entretien.",
      mode_siege: "Siège et coquille",
      mode_siege_desc: "Installation, réglages, sécurité et nettoyage des assises moulées.",
      mode_view: "Consulter",
      mode_dl: "Télécharger",
      sec_faq_eyebrow: "FAQ vidéo",
      sec_faq_title: "Vos questions, nos réponses en vidéo",
      sec_faq_subtitle: "Cinq capsules pédagogiques sous-titrées en 9 langues.",
      faq_v1_title: "Comment entretenir mon orthèse ?",
      faq_v1_desc: "Nettoyage, séchage et précautions au quotidien.",
      faq_v2_title: "Quand faut-il reconsulter ?",
      faq_v2_desc: "Les signes qui doivent vous alerter : douleur, rougeur, jeu anormal.",
      faq_v3_title: "Mon premier rendez-vous",
      faq_v3_desc: "Déroulement, documents à apporter, étapes de la prise en charge.",
      faq_v4_title: "Comment fonctionne la prise en charge ?",
      faq_v4_desc: "Sécurité sociale, mutuelle, entente préalable.",
      faq_v5_title: "Notre équipe et nos services",
      faq_v5_desc: "Découvrez le cabinet et nos compétences.",
      faq_q1: "Combien de temps faut-il pour fabriquer mon appareil ?",
      faq_a1: "En moyenne 2 à 4 semaines selon le type d'appareillage et la complexité. Les orthèses urgentes (post-chirurgie) sont prioritaires.",
      faq_q2: "Suis-je remboursé ?",
      faq_a2: "Oui, les appareillages prescrits sont remboursés par la Sécurité sociale (LPPR) et complétés par votre mutuelle. Nous vous accompagnons pour les démarches.",
      faq_q3: "Faut-il une ordonnance ?",
      faq_a3: "Oui, une prescription médicale (médecin traitant, MPR, chirurgien) est nécessaire pour la prise en charge.",
      faq_q4: "Proposez-vous des consultations à domicile ?",
      faq_a4: "Oui, pour les patients à mobilité réduite et selon les communes. Contactez-nous pour étudier votre situation.",
      faq_q5: "Acceptez-vous les patients de Saint-Laurent ou Kourou ?",
      faq_a5: "Oui, nous tenons des permanences sur rendez-vous à Saint-Laurent du Maroni et Kourou.",
      sec_contact_eyebrow: "Contact",
      sec_contact_title: "Une question ? Parlons-en.",
      sec_contact_subtitle: "Notre équipe vous répond du lundi au vendredi.",
      addr_label: "Adresse",
      addr_value: "1 rue des Arômes, 97354 Remire-Montjoly, Guyane française",
      tel_label: "Téléphone",
      tel_value: "+594 594 28 28 08",
      tel_hours: "Lun–Ven · 8h–17h",
      mail_label: "Email",
      mail_value: "contact@orthoespace3d.fr",
      whatsapp_label: "WhatsApp",
      whatsapp_value: "Service rappel sur demande",
      sites_label: "Sites de consultation",
      site_cay: "Cayenne (siège) — Lun–Ven 7h30–15h30",
      site_slm: "Saint-Laurent du Maroni — Sur rendez-vous",
      site_kou: "Kourou — Sur rendez-vous",
      form_name: "Votre nom",
      form_email: "Votre email",
      form_subject: "Objet",
      form_message: "Votre message",
      form_send: "Envoyer",
      sec_pro_title: "Espace prescripteurs",
      sec_pro_subtitle: "Outil de prescription LPPR, fiches techniques, protocoles, suivi patient partagé.",
      pro_tool_open: "Ouvrir l'outil de prescription",
      ethics_title: "Notre engagement éthique",
      ethics_respect: "Respect du patient — Chaque patient est accueilli avec dignité, sans distinction d'origine ou de situation.",
      ethics_local: "Ancrage guyanais — Fabrication locale, emploi local, partenariats territoriaux.",
      ethics_indep: "Indépendance — Nos choix techniques sont guidés uniquement par l'intérêt du patient.",
      footer_about: "Orthoprothésiste agréé en Guyane. Orthèses, prothèses et solutions d'impression 3D sur mesure au service de votre mobilité.",
      footer_nav: "Navigation",
      footer_legal: "Mentions légales",
      footer_privacy: "Confidentialité",
      footer_credits: "© 2026 Ortho Espace 3D — Tous droits réservés",
      a11y_title: "Aide à la lecture",
      a11y_text_size: "Taille du texte",
      a11y_contrast: "Contraste",
      a11y_dys: "Police dyslexie",
      a11y_spaced: "Espacement",
      a11y_motion: "Animations",
      a11y_normal: "Normal",
      a11y_high: "Élevé",
      a11y_dark: "Sombre",
      a11y_on: "Activé",
      a11y_off: "Désactivé",
      a11y_reset: "Tout réinitialiser",
      back_home: "← Retour à l'accueil"
    },
    en: {
      lang_name: "English",
      tagline: "Custom orthopaedic care to support your independence",
      splash_choose: "Choose your space",
      porte_patient: "Patients & Visitors",
      porte_patient_desc: "User guides, team, FAQ, appointments",
      porte_pro: "Healthcare Professionals",
      porte_pro_desc: "Directory, prescription tool, resources",
      porte_enter: "Enter →",
      nav_home: "Home", nav_team: "Team", nav_expertises: "Services",
      nav_modes: "User guides", nav_faq: "FAQ", nav_contact: "Contact",
      nav_pro: "Pro space", nav_patient: "Patient space",
      hero_eyebrow: "📍 Remire-Montjoly · French Guiana",
      hero_title: "Custom orthopaedic care to support your <span class=\"accent\">independence</span>",
      hero_subtitle: "Personalised orthoses, prostheses and 3D-printed solutions. A dedicated team, a human approach, an ethical commitment to our patients and our territory.",
      cta_appointment: "Book an appointment", cta_modes: "View user guides",
      cta_3d: "View our devices in 3D",
      sec_team_eyebrow: "Our team", sec_team_title: "Professionals at your service",
      sec_expert_eyebrow: "Our services", sec_expert_title: "Solutions tailored to every situation",
      exp_orth_title: "Orthoses", exp_proth_title: "Prostheses",
      exp_3d_title: "3D printing", exp_petit_title: "Small devices",
      sec_modes_eyebrow: "User guides", sec_modes_title: "How to use and care for your devices",
      mode_view: "View", mode_dl: "Download",
      sec_faq_eyebrow: "Video FAQ", sec_faq_title: "Your questions, answered on video",
      sec_contact_title: "Have a question? Let's talk.",
      addr_label: "Address", tel_label: "Phone", mail_label: "Email",
      whatsapp_label: "WhatsApp", sites_label: "Consultation sites",
      form_name: "Your name", form_email: "Your email", form_subject: "Subject",
      form_message: "Your message", form_send: "Send",
      a11y_title: "Reading assistance",
      a11y_text_size: "Text size", a11y_contrast: "Contrast",
      a11y_dys: "Dyslexia font", a11y_spaced: "Spacing", a11y_motion: "Animations",
      a11y_normal: "Normal", a11y_high: "High", a11y_dark: "Dark",
      a11y_on: "On", a11y_off: "Off", a11y_reset: "Reset all",
      back_home: "← Back to home"
    },
    es: {
      lang_name: "Español",
      tagline: "Aparatos a medida al servicio de su autonomía",
      splash_choose: "Elija su espacio",
      porte_patient: "Pacientes y visitantes",
      porte_patient_desc: "Manuales, equipo, FAQ, citas",
      porte_pro: "Profesionales de la salud",
      porte_pro_desc: "Directorio, herramienta de prescripción, recursos",
      porte_enter: "Entrar →",
      nav_home: "Inicio", nav_team: "Equipo", nav_expertises: "Servicios",
      nav_modes: "Manuales", nav_faq: "FAQ", nav_contact: "Contacto",
      hero_eyebrow: "📍 Remire-Montjoly · Guayana Francesa",
      hero_title: "Aparatos a medida al servicio de su <span class=\"accent\">autonomía</span>",
      cta_appointment: "Pedir cita", cta_modes: "Ver manuales", cta_3d: "Ver en 3D",
      a11y_title: "Ayuda a la lectura",
      back_home: "← Volver al inicio"
    },
    pt: {
      lang_name: "Português",
      tagline: "Aparelhos sob medida para a sua autonomia",
      splash_choose: "Escolha o seu espaço",
      porte_patient: "Pacientes e visitantes",
      porte_pro: "Profissionais de saúde",
      porte_enter: "Entrar →",
      nav_home: "Início", nav_team: "Equipe", nav_expertises: "Serviços",
      nav_modes: "Manuais", nav_faq: "FAQ", nav_contact: "Contato",
      hero_eyebrow: "📍 Remire-Montjoly · Guiana Francesa",
      cta_appointment: "Marcar consulta",
      a11y_title: "Ajuda à leitura",
      back_home: "← Voltar ao início"
    },
    nl: {
      lang_name: "Nederlands",
      tagline: "Maatwerk hulpmiddelen voor uw zelfstandigheid",
      splash_choose: "Kies uw ruimte",
      porte_patient: "Patiënten en bezoekers",
      porte_pro: "Zorgprofessionals",
      porte_enter: "Binnenkomen →",
      nav_home: "Home", nav_team: "Team", nav_modes: "Handleidingen",
      nav_faq: "FAQ", nav_contact: "Contact",
      a11y_title: "Leeshulp",
      back_home: "← Terug naar home"
    },
    ar: {
      lang_name: "العربية",
      tagline: "أجهزة تقويمية مخصصة في خدمة استقلاليتك",
      splash_choose: "اختر مساحتك",
      porte_patient: "المرضى والزوار",
      porte_pro: "المهنيون الصحيون",
      porte_enter: "← دخول",
      nav_home: "الرئيسية", nav_team: "الفريق", nav_modes: "أدلة الاستخدام",
      nav_faq: "أسئلة شائعة", nav_contact: "اتصل بنا",
      a11y_title: "المساعدة على القراءة",
      back_home: "→ العودة للرئيسية"
    },
    zh: {
      lang_name: "中文",
      tagline: "量身定制的矫形器具，助您自主生活",
      splash_choose: "选择您的空间",
      porte_patient: "患者与访客",
      porte_pro: "医疗专业人员",
      porte_enter: "进入 →",
      nav_home: "首页", nav_team: "团队", nav_modes: "使用说明",
      nav_faq: "常见问题", nav_contact: "联系我们",
      a11y_title: "阅读辅助",
      back_home: "← 返回首页"
    },
    gcr: {
      lang_name: "Kréol gwiyané",
      tagline: "Apareyaj swr mèziw pou otonomi-w",
      splash_choose: "Chwazi plas-aw",
      porte_patient: "Pasyan é vizitè",
      porte_pro: "Profésyonèl lasanté",
      porte_enter: "Antré →",
      nav_home: "Akèy", nav_team: "Ékip", nav_modes: "Mod-anplwa",
      nav_faq: "Késyon", nav_contact: "Kontak",
      a11y_title: "Èd pou liziè",
      back_home: "← Ritounen akèy"
    },
    hmn: {
      lang_name: "Hmoob",
      tagline: "Cov twj kho lub cev raws li koj xav tau",
      splash_choose: "Xaiv koj qhov chaw",
      porte_patient: "Cov neeg mob thiab tuaj saib",
      porte_pro: "Cov kws kho mob",
      porte_enter: "Nkag →",
      nav_home: "Tsev", nav_team: "Pab", nav_modes: "Cov lus qhia",
      nav_faq: "Lus nug", nav_contact: "Hu",
      a11y_title: "Pab nyeem",
      back_home: "← Rov qab"
    }
  };

  const RTL = ["ar"];
  const LANGS = ["fr","en","es","pt","nl","ar","zh","gcr","hmn"];
  const FLAGS = { fr:"🇫🇷", en:"🇬🇧", es:"🇪🇸", pt:"🇵🇹", nl:"🇳🇱", ar:"🇸🇦", zh:"🇨🇳", gcr:"🌴", hmn:"🌺" };

  function t(key, lang) {
    const l = lang || currentLang();
    return (DICT[l] && DICT[l][key]) || DICT.fr[key] || key;
  }

  function currentLang() {
    return localStorage.getItem("oe3d-lang") || (navigator.language || "fr").slice(0, 2);
  }

  function setLang(lang) {
    if (!DICT[lang]) lang = "fr";
    localStorage.setItem("oe3d-lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL.includes(lang) ? "rtl" : "ltr";
    apply();
  }

  function apply() {
    const lang = currentLang();
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL.includes(lang) ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const val = t(key, lang);
      if (val) el.innerHTML = val;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(el => {
      const spec = el.getAttribute("data-i18n-attr");
      spec.split(";").forEach(pair => {
        const [attr, key] = pair.split(":").map(s => s.trim());
        if (attr && key) el.setAttribute(attr, t(key, lang));
      });
    });
  }

  window.OE3D_I18N = { t, setLang, currentLang, apply, LANGS, FLAGS, DICT };
  document.addEventListener("DOMContentLoaded", apply);
})();
