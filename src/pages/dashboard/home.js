import { useState } from "react";

// material
import { Box, Grid, Container, Typography, Card, CardContent, List, ListItem, ListItemIcon, ListItemButton, Collapse } from '@mui/material';
import { Icon } from '@iconify/react';

// components
import Page from '../../components/layouts/Page';
import MyCarousel from '../../components/Carousel';

// multi language support
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function DashboardHome() {
	const { t, i18n } = useTranslation('home');
	const [expanded, setExpanded] = useState(false);

	let carouselItems = [
		{ src: '/static/homePageImg/placeholder.png', altText: "Placeholder image 1" },
		{ src: '/static/homePageImg/placeholder.png', altText: "Placeholder image 2" },
		{ src: '/static/homePageImg/placeholder.png', altText: "Placeholder image 3" },
	];

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Page title={t('Website name', { ns: 'sidebar' })}>
			<Container maxWidth="xl">
				<Grid container spacing={3}>
					<Grid item md={12} sm={12} xs={12}>
						<Card>
							<CardContent>
								<Typography variant="h3" gutterBottom>{t("Introduction.title")}</Typography>
								<Typography variant="body2" gutterBottom>
									<div style={{ whiteSpace: "pre-line" }} >
										{t("Introduction.content")}
									</div>
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item md={12} sm={12} xs={12}>
						<Card>
							<CardContent>
								<Typography variant="h3" gutterBottom>{t("Preview.title")}</Typography>
								<Typography variant="body2" gutterBottom>
									<MyCarousel items={carouselItems} />
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12}>
						<Card>
							<CardContent>
								<Box onClick={handleExpandClick}>
									<Typography variant="h3" gutterBottom>{t('License.title')}</Typography>
									<Collapse in={expanded} timeout="auto">
										<Typography variant="body2" gutterBottom>
											<div style={{ whiteSpace: "pre-line" }} >
												{t('License.content')}
											</div>
										</Typography>
									</Collapse>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</Page>
	);
}
