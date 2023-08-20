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

import { dbTodoProps } from "../Home";
import { UserTitleCount } from "./Dashboard";

// TODO: stopped here
// parse totalTodos into a format that echarts can use

type statCardProps = {
	totalTodos: UserTitleCount[];
  title: string;
};

type EChartsOption = echarts.ComposeOption<
	TooltipComponentOption | LegendComponentOption | PieSeriesOption
>;

const StatCard = ({ totalTodos, title }: statCardProps) => {
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
		legend: {
			top: "5%",
			left: "center",
		},
		series: [
			{
				name: "Access From",
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
				data: [
					{ value: 1048, name: "Search Engine" },
					{ value: 735, name: "Direct" },
					{ value: 580, name: "Email" },
					{ value: 484, name: "Union Ads" },
					{ value: 300, name: "Video Ads" },
				],
			},
		],
	};

	return (
		<div className="stat-card">
			<ReactECharts
				echarts={echarts}
				option={option}
				style={{ height: 400 }}
			/>
      <h2 className="stat-card__title">{title}</h2>
		</div>
	);
};

export default StatCard;
