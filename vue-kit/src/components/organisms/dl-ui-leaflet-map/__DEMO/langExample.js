export default {
  'en-GB' : {
    'baselayer' : {
      'dark'          : 'Dark',
      'imagery'       : 'Imagery',
      'openStreetMap' : 'OSM',
      'toner'         : 'Light'
    },
    'layerControl' : {
      'main'  : 'Toggle all layers',
      'drone' : {
        'label' : 'Drones',
        'title' : 'Drone features'
      },
      'geofences' : {
        'label'    : 'Geofences',
        'title'    : 'Geofences container',
        'children' : {
          'geotesting' : {
            'label' : 'Geofences testing',
            'title' : 'A layer to test geos'
          },
          'ndz' : {
            'label'    : 'NDZ',
            'title'    : 'No drone zone',
            'children' : {
              'airport' : {
                'label' : 'Airport',
                'title' : 'Aerodromes'
              },
              'criin' : {
                'label' : 'Critical infrastructure',
                'title' : 'Hospitals, Military, power plants'
              }
            }
          }
        }
      }
    },
    'rulesWarnings' : {
      'section' : {
        'certified' : {
          'paragraph' : [
            'Certified operations require manual authorisation',
            'The UA operated in this area must be registered and airworthiness certified pursuant Commission Regulations (EU) No 748/2012, (EU) No 2015/640 and (EU) No 1321/2014.'
          ],
          'title' : 'Certified category'
        },
        'general' : {
          'paragraph' : [
            'It is forbidden to fly above 120m',
            'It is forbidden to operate the UA while operating a moving vehicle',
            'It is forbidden to operate more than one UA at a time',
            'The dissemination of people and private places images requires authorisation of the involved people/owners',
            'Remember to check the weather conditions prior the operation planning',
            'It is forbidden to fly during the night.'
          ],
          'title' : 'General Warnings'
        },
        'open' : {
          'paragraph' : [
            'It is forbidden to fly above assemblies of people',
            'It is forbidden to fly UA with MTOM>25kg',
            'It is forbidden any autonomous operation',
            'It is forbidden to carry dangerous goods and drop any material',
            'It is forbidden any operation in BVLOS without an UA observer or flying in follow-me mode',
            'The minimum age for remote pilot without supervision is 16 years old unless operating an UAS class C0 classified as toy in A1 subcategory.'
          ],
          'title' : 'Open category'
        },
        'specific' : {
          'paragraph' : [
            'The minimum age for remote pilot without supervision is 16 years old',
            'The competent authority may require the certification of the UAS t adequately mitigate the risk of the operation',
            'An operational authorisation issued by competent authority with a risk assessment attached is needed, unless it applies any of the following: PDRA, LUC, declaration STS or club/association authorisation.'
          ],
          'title' : 'Specific category'
        }
      },
      'title'       : 'Rules and Warnings',
      'description' : 'Example of infobox data'
    }
  },
  'es-ES' : {
    'baselayer' : {
      'dark'          : 'Oscuro',
      'imagery'       : 'Sat??lite',
      'openStreetMap' : 'OSM',
      'toner'         : 'Toner'
    },
    'layerControl' : {
      'main'  : 'Todas las capas',
      'drone' : {
        'label' : 'Drones',
        'title' : 'Caracteristicas del drone'
      },
      'geofences' : {
        'label'    : 'Geofences',
        'title'    : 'Contenedor de Geofences',
        'children' : {
          'geotesting' : {
            'label' : 'Test de Geofences',
            'title' : 'Capa para testar geos'
          },
          'ndz' : {
            'label'    : 'NDZ',
            'title'    : 'Zona sin drones',
            'children' : {
              'airport' : {
                'label' : 'Aeropuertos',
                'title' : 'Aer??dromos'
              },
              'criin' : {
                'label' : 'Infraestructura cr??tica',
                'title' : 'Hospitales, militales, centrales el??ctricas'
              }
            }
          }
        }
      }
    },
    'rulesWarnings' : {
      'section' : {
        'certified' : {
          'paragraph' : [
            'Las operaciones certificadas requieren autorizaci??n manual',
            'El UA operado en esta ??rea debe estar registrado y certificado de aeronavegabilidad de conformidad con los Reglamentos de la Comisi??n (UE) No. 748/2012, (UE) No. 2015/640 y (UE) No. 1321/2014.'
          ],
          'title' : 'Categor??a certificada'
        },
        'general' : {
          'paragraph' : [
            'Est?? prohibido volar por encima de los 120 m.',
            'Est?? prohibido operar la UA mientras se maneja un veh??culo en movimiento',
            'Est?? prohibido operar m??s de una UA a la vez',
            'La difusi??n de im??genes de personas y lugares privados requiere la autorizaci??n de las personas / propietarios involucrados',
            'Recuerde verificar las condiciones clim??ticas antes de la planificaci??n de la operaci??n',
            'Est?? prohibido volar durante la noche.'
          ],
          'title' : 'Advertencias generales'
        },
        'open' : {
          'paragraph' : [
            'Est?? prohibido volar sobre reuniones de personas',
            'Est?? prohibido volar UA con MTOM> 25 kg',
            'Est?? prohibido cualquier operaci??n aut??noma.',
            'Est?? prohibido transportar mercanc??as peligrosas y dejar caer cualquier material.',
            'Est?? prohibido cualquier operaci??n en BVLOS sin un observador UA o volando en modo "S??gueme"',
            'La edad m??nima para el piloto remoto sin supervisi??n es de 16 a??os a menos que opere un UAS clase C0 clasificado como juguete en la subcategor??a A1.'
          ],
          'title' : 'Categor??a abierta'
        },
        'specific' : {
          'paragraph' : [
            'La edad m??nima para el piloto remoto sin supervisi??n es de 16 a??os.',
            'La autoridad competente puede exigir la certificaci??n de la UAS para mitigar adecuadamente el riesgo de la operaci??n.',
            'Se necesita una autorizaci??n operativa emitida por la autoridad competente con una evaluaci??n de riesgos adjunta, a menos que aplique alguno de los siguientes: PDRA, LUC, declaraci??n STS o autorizaci??n de club / asociaci??n.'
          ],
          'title' : 'Categor??a espec??fica'
        }
      },
      'title'       : 'Normas y Avisos',
      'description' : 'Ejemplo de datos de infobox'
    }
  }
};
