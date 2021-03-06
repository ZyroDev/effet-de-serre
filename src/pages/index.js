import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { lighten, desaturate } from 'unitransform';
import { css } from '@emotion/core';
import { withRouteData } from 'react-static';
import { Scatter } from 'react-chartjs-2';
import Cite from '../components/cite';
import RefList from '../components/reflist';
import IsEarthWarming from '../components/isEarthWarming';
import Header from '../components/header';
import CO2 from '../components/co2';
import ContentWrapper from '../components/contentWrapper';
import { red } from '../utils/colors';
import ShareLinks from '../components/shareLinks';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const figureWrapperStyle = css`
      width: 80%;
      margin: 3rem auto;
      >div{
        padding 1.5rem;
        box-shadow:rgba(00, 00, 00, 0.2) 0px 6px 16px 0px;
        border-radius: 5px;
        > img {
          width: 100%;
        }
      @media (max-width: 700px) {
        padding: 0;
        box-shadow: none;
      }
      }
      >strong {
        margin-top: 1.5rem;
        display: block;
        text-align: center;
      }
      @media (max-width: 700px) {
        width: 98%;
      }
    `;
    const datasetOptions = {
      borderColor: lighten(red, 10),
      backgroundColor: desaturate(lighten(red, 20), 30),
    };

    const {
      co2,
      temp,
      latestCo2Value,
      latestTempValue,
      slrTrend,
      latestCo2Year,
      latestIceMeltValue,
      latestTempYear,
      tenYearWarming,
    } = this.props;

    return (
      <>
        <Header
          currentCo2={latestCo2Value}
          currentTemp={latestTempValue}
          currentSlr={slrTrend}
          currentIceMelt={latestIceMeltValue}
        />
        <ContentWrapper>
          <article
            css={css`
              svg {
                margin: 0 auto;
                display: block;
                .mg-active-datapoint-container {
                  transform: translate(-200px, 0);
                }
              }
            `}
          >
            <h2
              css={css`
                margin-top: 0;
                padding-top: 0;
              `}
            >
              Le r??chauffement climatique est-il toujours d'actualit?? ?
            </h2>
            <IsEarthWarming
              tenYearWarming={tenYearWarming}
              latestTempValue={latestTempValue}
            />
            <ShareLinks />
            <h2>Qu'est ce que le r??chauffement climatique?</h2>
            <p>
            Le r??chauffement climatique est la tendance de la Terre
              ?? augmenter de temp??rature ?? un rythme sans pr??c??dent ?? partir du milieu
               20i??me si??cle.
              <Cite name="nasa" />
            </p>
            <p>
            Bien que des changements graduels sur Terre
              et sur climat se sont produits dans le pass??, cette derni??re tendance a ??t??
               principalement caus??e par la lib??ration de dioxyde de carbone (
              <CO2 />
              ) dans l'atmosph??re en br??lant des combustibles fossiles.
              <Cite name="nasa" />
              {` `}
              <CO2 />
              {` `}
              est un
              {` `}
              <em>gaz ?? effet de serre</em>
              , cela veut dire qu'il
               il emprisonne la chaleur dans la Terre
              {`'`}
              et l'atmosph??re plut??t que de lui permettre de rayonner dans l'espace.
              <Cite name="nasa" />
            </p>
            <p>
            Depuis le milieu des ann??es 1950, la temp??rature de la Terre 
              a une nette tendance positive (voir fig. 1).
            </p>
            <div css={figureWrapperStyle}>
              <div>
                <Scatter
                  data={{
                    datasets: [
                      {
                        label: `Global average temperature`,
                        data: temp,
                        ...datasetOptions,
                      },
                    ],
                  }}
                  options={{
                    legend: {
                      display: false,
                    },
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            callback: (value) => `${value}??C`,
                          },
                          scaleLabel: {
                            display: true,
                            labelString: `Temp??rature moyenne mondiale`,
                          },
                        },
                      ],
                    },
                    tooltips: {
                      callbacks: {
                        label: (tooltipItem) => `${tooltipItem.xLabel}, ${tooltipItem.yLabel}??C`,
                      },
                      mode: `index`,
                      intersect: false,
                    },
                  }}
                />
              </div>
              <strong>
                Figure 1
                <Cite name="tempData" />
              </strong>
            </div>
            <p>
                La quantit?? de terre s'est r??chauff??e est mesur??e par rapport ?? la moyenne
               temp??rature globale pr??-industrielle. ?? partir de
              {` `}
              <span id="latestTempYear">{latestTempYear}</span>
              , La temp??rature de la Terre est d'environ
              {` `}
              <span id="latestTempValue">{latestTempValue}</span>
              ??C au-dessus des niveaux pr??industriels.
              <Cite name="tempData" />
              {` `}
              Si la temp??rature de la plan??te
              continue d'augmenter, on peut s'attendre ?? beaucoup
               impacts environnementaux et soci??taux dont les plus significatifs
               nous expliquerons dans cet article.
            </p>
            <p>
            Fin 2015, 184 nations ??taient parties ?? l'Accord de Paris sur le climat,
               un accord de l'ONU portant sur la r??duction des ??missions de gaz ?? effet de
               un effort pour att??nuer le r??chauffement climatique. L'objectif d??clar?? de la
               accord est de limiter la temp??rature moyenne mondiale ?? 1,5??C
               au-dessus des niveaux pr??industriels.
              <Cite name="1.5C" />
            </p>
            <p>
            En 2018, l'ONU a publi?? un rapport d??taillant les impacts potentiels
               du changement climatique induit par l'homme et d'??ventuelles
               les mesures. Sa principale conclusion ??tait que rester en dessous de l'objectif de 1,5????C
               est possible, mais n??cessiterait
               {` `}
               {`"`}
               des changements rapides, profonds et sans pr??c??dent dans tous les aspects de
               soci??t??
              {`"`}
              .
              <Cite name="1.5C-press-release" />
              {` `}
              Les ??missions humaines de carbone seraient
               doivent diminuer de 45 % par rapport aux niveaux de 2010 d'ici 2030 et atteindre une
               z??ro d'ici 2050.
              <Cite name="1.5C" />
            </p>
            <p>
            La principale cause du r??chauffement climatique est l'??mission humaine de
               {` `}
               <CO2 />
               {` `}
               dans l'atmosph??re
               <CO2 />
               {` `}
               est produit par la combustion de combustibles fossiles, principalement ?? partir d'??lectricit??
               production, agriculture, industrie et v??hicules avec
               moteurs ?? combustion.
              <Cite name="emissionsData" />
              {` `}
              ?? partir de
              {` `}
              <span id="latestCo2Year">{latestCo2Year}</span>
              , la concentration
               {`'`}
               en carbone de l'atmosph??re
               {` `}
               <span id="latestCo2Value">{latestCo2Value}</span>
               ppm (voir fig. 2).
              <Cite name="co2After1958" />
            </p>
            <div css={figureWrapperStyle}>
              <div>
                <Scatter
                  data={{
                    datasets: [
                      {
                        label: `CO2 atmosph??rique`,
                        data: co2,
                        ...datasetOptions,
                      },
                    ],
                  }}
                  options={{
                    legend: {
                      display: false,
                    },
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            callback: (value) => `${value}ppm`,
                          },
                          scaleLabel: {
                            display: true,
                            labelString: `Concentration atmosph??rique de CO2`,
                          },
                        },
                      ],
                    },
                    tooltips: {
                      callbacks: {
                        label: (tooltipItem) => `${tooltipItem.xLabel}, ${tooltipItem.yLabel}ppm`,
                      },
                      mode: `index`,
                      intersect: false,
                    },
                  }}
                />
              </div>
              <strong>
                Figure 2
                <Cite name="co2After1958" />
                <Cite name="co2Before1958" />
              </strong>
            </div>
            <p>
            Puisque 
               {` `}
               l'abondance de  {` `}
               <CO2 />
               {` `}
                dans l'atmosph??re est directement li??e ?? l'augmentation'
               {`'`}
               de la temp??rature de la Terre, limitant le carbone atmosph??rique a ??t??
               identifi??e comme vitale pour att??nuer le r??chauffement climatique. En tant que membre de
               Convention sur le climat du Protocole de Kyoto, les scientifiques ont 450ppm comme
               bonne limite sup??rieure pour la concentration de carbone afin de maintenir
               r??chauffement en dessous de +2??C.
            </p>
            <h2>Effets du r??chauffement climatique</h2>
             <p>
               Le r??chauffement climatique aura un impact sur un large ??ventail de probl??mes, y compris
               sant??, moyens de subsistance, s??curit?? alimentaire, approvisionnement en eau, s??curit?? humaine,
               et la croissance ??conomique.
               <Cite name="1.5C" />
               {` `}
               La gravit?? de ces impacts est d??termin??e
               par la temp??rature de la Terre??; atteignant 2??C au-dessus de la temp??rature pr??industrielle
               moyenne mettrait des millions de personnes de plus en danger que si
               le r??chauffement a ??t?? limit?? ?? 1,5??C.
               <Cite name="1.5C" />
               {` `}
               En g??n??ral,
               {`"`}
               les pays des tropiques et subtropicaux de l'h??misph??re sud sont
               devraient conna??tre les impacts les plus importants sur la croissance ??conomique.
               {`"`}
               <Cite name="1.5C" />
             </p>
             <p>
               L'ONU pr??voit des ph??nom??nes m??t??orologiques extr??mes plus fr??quents (fortes pluies
               et s??cheresse) et les temp??ratures extr??mes dues au r??chauffement climatique.
               <Cite name="1.5C" />
               {` `}
               Le risque le plus imm??diat pour l'environnement est
               la disparition des r??cifs coralliens - un processus qui a d??j?? commenc??
               ?? grande ??chelle (voir fig. 3).
             </p>
            <div css={figureWrapperStyle}>
              <div>
                <img src={`assets/risks.png`} alt="risks of climate change" />
              </div>
              <strong>
                Figure 3
                <Cite name="guardian" />
                <Cite name="1.5C" />
              </strong>
            </div>
            <p>
              Le changement climatique est susceptible d'augmenter la pr??valence de
              maladie. On estime que les augmentations mondiales de temp??rature modifient
              la r??partition des insectes vecteurs connus de pathog??nes,
              comme les moustiques.
              <Cite name="pathogenMigration" />
              {` `}
              Des ??tudes en Chine montrent que
              l'augmentation des temp??ratures affecte positivement la viabilit?? de la maladie
              transfert en diminuant le temps d'incubation virale dans les vecteurs --
              entra??nant une augmentation des taux d'infection.
              <Cite name="viralIncubation" />
              L'Organisation mondiale de la sant?? a estim?? que le changement climatique a
              responsables de 3 % des diarrh??es, 3 % du paludisme et 3,8 % des
              d??c??s dus ?? la dengue dans le monde en 2004. Total attribuable
              la mortalit?? ??tait d'environ 0,2 % des d??c??s en 2004 ; parmi ceux-ci, 85 % ??taient
              d??c??s d'enfants.
              <Cite name="qui" />
            </p>
            <p>
              La biodiversit?? mondiale est fortement menac??e par le changement climatique
              ?? mesure que les environnements changeants augmentent la pression d'extinction sur les esp??ces.
              Un examen en 2013 r??v??le que l'??volution des environnements peut conduire ??
              l'extinction de milliers d'esp??ces dans les 100 prochaines ann??es.
              Les causes imm??diates de ces extinctions comprennent des facteurs biotiques et
              facteurs abiotiques, tels qu'une tol??rance physiologique limit??e aux
              les temp??ratures et l'??volution des interactions entre les esp??ces.
              <Cite name="speciesExtinction" />
            </p>
            <p>
              Alors que la menace pour la biodiversit?? se profile, l'augmentation des zoonoses
              maladie ?? travers le monde. Une plus grande biodiversit?? donne moins de pathog??nes
              place pour dominer et se propager, et que les humains exploitent et d??gradent ces
              ??cosyst??mes vitaux, les conditions deviennent plus favorables ?? ces h??tes,
              vecteurs et agents pathog??nes.
              <Cite name="zoonoticDisease" />
              {` `}
              Avec la mont??e du COVID-19 et ses effets
              ??tant fortement ressenti dans le monde entier, il est ind??niablement clair que le
              la propagation de ces maladies zoonotiques est un r??sultat majeur de notre surexploitation
              des ressources naturelles et des habitats vitaux. Alors que la demande de viande et de terre
              augmentation, la d??forestation massive a consid??rablement augment?? le contact humain
              avec des animaux sauvages et leurs fluides corporels qui peuvent ??tre des vecteurs d'agents pathog??nes.
              <Cite name="zoonoticDiseaseTwo" />
            </p>
            <p>
              Parmi les autres impacts d??j?? visibles du r??chauffement climatique, citons
              la fonte des glaciers et de la banquise, qui contribue ?? l'??l??vation du niveau de la mer.
              <Cite name="natG??o" />
              {` `}
              Cependant, la dilatation thermique est plus importante
              composante dans ce, contribuant 70-75% de l'??l??vation du niveau de la mer.
              <Cite name="ipcc" />
              {` `}
              Certaines r??gions ont connu une grave s??cheresse, entra??nant
              les p??nuries de nourriture et d'eau ainsi que les incendies de for??t.
              <Cite name="natG??o" />
            </p>
            <h2
              css={css`
                margin-top: 4%;
                font-size: 1.2em;
              `}
            >
              Liens
            </h2>
            <RefList />
          </article>
        </ContentWrapper>
      </>
    );
  }
}

Home.propTypes = {
  co2: PropTypes.arrayOf(PropTypes.object),
  temp: PropTypes.arrayOf(PropTypes.object),
  latestCo2Value: PropTypes.number,
  latestTempValue: PropTypes.number,
  latestIceMeltValue: PropTypes.number,
  latestTempYear: PropTypes.number,
  slrTrend: PropTypes.number,
  latestCo2Year: PropTypes.number,
  tenYearWarming: PropTypes.number.isRequired,
};

export default withRouteData(Home);
