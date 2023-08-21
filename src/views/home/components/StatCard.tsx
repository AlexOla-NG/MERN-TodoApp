import React from "react";
import * as echarts from "echarts/core";
import {
	TooltipComponent,
	TooltipComponentOption,
	LegendComponent,
	LegendComponentOption,
} from "echarts/components";
import { PieChart, PieSeriesOption } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import ReactECharts from "echarts-for-react";

import { UserTitleCount } from "./Dashboard";

type statCardProps = {
	todos: UserTitleCount[];
	title: string;
};

type EChartsOption = echarts.ComposeOption<
	TooltipComponentOption | LegendComponentOption | PieSeriesOption
>;

const StatCard = ({ todos, title }: statCardProps) => {
	echarts.use([
		TooltipComponent,
		LegendComponent,
		PieChart,
		CanvasRenderer,
		LabelLayout,
	]);

	const option: EChartsOption = {
		tooltip: {
			trigger: "item",
		},
		series: [
			{
				name: title,
				type: "pie",
				radius: ["40%", "70%"],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					borderColor: "#fff",
					borderWidth: 2,
				},
				label: {
					show: false,
					position: "center",
				},
				emphasis: {
					label: {
						show: true,
						fontSize: 40,
						fontWeight: "bold",
					},
				},
				labelLine: {
					show: false,
				},
				data: [...todos],
			},
		],
	};

	return (
		<div className="stat-card">
			<ReactECharts
				echarts={echarts}
				option={option}
				style={{ height: 200, width: 200 }}
			/>
			<h2 className="stat-card__title">{title}</h2>
		</div>
	);
};

export default StatCard;
