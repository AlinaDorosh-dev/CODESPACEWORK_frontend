import React from 'react';
import styles from '../../styles/navbarpublic.module.css';

const AboutUs = () => {
	return (
		<>
			<div className={`${styles.marginContainer}`}>
				<div className={`${styles.usContainer}`}>
					<h1 className={`${styles.h1Us}`}>Sobre Nosotros</h1>
					<div className={`${styles.pall}`}>
						<q className={`${styles.q}`}>
							Ser un CODESPACER es ser uno de los nuestros, es formar parte de
							nuestra pequeña gran familia, es crecer profesionalmente junto a
							nosotros
						</q>
						<p className={`${styles.p}`}>
							El lema de Code Space Academy define a la perfección nuestra
							edición formada por más 20 personas. Dicha edición es la número
							11, la cual ha sido la encargada del desarrollo de esta web. Este
							grupo está formado por los siguientes profesionales:
						</p>
						<div className={`${styles.developers}`}>
							<ul className={`${styles.developersName}`}>
								<li>Alice Marchi</li>
								<li>Alina Dorosh</li>
								<li>Ana Lorenzo</li>
								<li>Armiche Ramos</li>
								<li>Benjamín Mancera</li>
							</ul>
							<ul className={`${styles.developersName}`}>
								<li>Daniel Sánchez</li>
								<li>Daniel Vallejo</li>
								<li>Daniel Villalba</li>
								<li>David Bonora</li>
								<li>David Calero</li>
							</ul>
							<ul className={`${styles.developersName}`}>
								<li>Elena López</li>
								<li>Ismael Boumhir</li>
								<li>Juan Domínguez</li>
								<li>Laura Carqué</li>
								<li>Naiara Cuevas</li>
							</ul>
							<ul className={`${styles.developersName}`}>
								<li>Nelson González</li>
								<li>Pablo Muñoz</li>
								<li>Rafael Fernandez</li>
								<li>Sebastian Gonzalez</li>
								<li>Verónica Sanchez</li>
							</ul>
						</div>
						<p className={`${styles.p}`}>
							<a
								className={`${styles.c}`}
								href='https://github.com/orgs/GhostDevs3/teams/codespace-11/repositories'>
								Repositorios del proyecto
							</a>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutUs;
