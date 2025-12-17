# Sales Dashboard Application

A modern, responsive sales analytics dashboard built with React, TypeScript, Tailwind CSS, and Convex. This application demonstrates atomic design principles and provides interactive data visualization for sales performance analysis.

## 🚀 Features

### Core Functionality
- **Interactive Sales Dashboard**: Comprehensive view of sales data across multiple years (2022-2024)
- **Multiple Chart Types**: Switch between Bar Charts, Line Charts, and Pie Charts using Recharts
- **Advanced Filtering**: Filter data by year and minimum revenue threshold
- **Real-time Metrics**: Display key performance indicators including total revenue, units sold, and averages
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices

### Technical Features
- **Atomic Design Architecture**: Components organized into atoms, molecules, and organisms
- **TypeScript**: Full type safety throughout the application
- **Convex Backend**: Real-time database with reactive queries
- **Authentication**: Secure user authentication with Convex Auth
- **Modern UI**: Clean, professional interface built with Tailwind CSS

## 🏗️ Architecture

### Atomic Design Structure
```
src/components/
├── atoms/           # Basic building blocks
│   ├── Button.tsx   # Reusable button component
│   ├── Input.tsx    # Form input component
│   └── Card.tsx     # Container component
├── molecules/       # Combinations of atoms
│   ├── FilterControls.tsx      # Year and revenue filters
│   └── ChartTypeSelector.tsx   # Chart type switching
├── organisms/       # Complex UI sections
│   ├── SalesChart.tsx    # Main chart component
│   └── SalesMetrics.tsx  # KPI metrics display
└── pages/          # Full page layouts
    └── Dashboard.tsx # Main dashboard page
```

### Data Structure
The application uses mock sales data with the following structure:
- **Year**: 2022, 2023, 2024
- **Monthly Data**: Revenue and units sold per month
- **Product Categories**: Electronics (expandable)
- **Regional Data**: North America (expandable)

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: Convex (reactive database)
- **Charts**: Recharts library
- **Authentication**: Convex Auth
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom components

## 📊 Data Source

This application uses **mock sales data** based on realistic e-commerce patterns. The data includes:
- 36 months of sales data (2022-2024)
- Monthly revenue ranging from $85,000 to $210,000
- Unit sales from 620 to 1,580 per month
- Realistic growth trends and seasonal variations

**Note**: This is demonstration data and not from actual business operations.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone and setup the project** (already done in this environment)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   - The app will open automatically in your browser
   - Sign in using the authentication form
   - The dashboard will initialize with mock sales data

### Environment Setup
The application is pre-configured with:
- Convex backend deployment
- Authentication system
- Mock data initialization

## 📈 Usage Guide

### Dashboard Navigation
1. **Sign In**: Use the authentication form to access the dashboard
2. **View Metrics**: Key performance indicators are displayed at the top
3. **Filter Data**: Use year buttons and revenue input to filter results
4. **Switch Charts**: Toggle between bar, line, and pie chart visualizations
5. **Reset Filters**: Clear all filters to view complete dataset

### Filter Options
- **Year Filter**: View data for specific years (2022, 2023, 2024) or all years
- **Revenue Threshold**: Set minimum revenue to filter out lower-performing months
- **Chart Types**: 
  - Bar Chart: Monthly revenue comparison
  - Line Chart: Revenue trends over time
  - Pie Chart: Revenue distribution by year

## 🔧 Customization

### Adding New Chart Types
1. Update the `ChartType` type in `ChartTypeSelector.tsx`
2. Add new chart rendering logic in `SalesChart.tsx`
3. Import additional chart components from Recharts

### Extending Data Filters
1. Add new filter controls in `FilterControls.tsx`
2. Update the Convex query in `salesData.ts`
3. Modify the filter state management in `Dashboard.tsx`

### API Integration
To replace mock data with real API data:
1. Create new Convex actions for API calls
2. Update the data initialization in `salesData.ts`
3. Modify the data structure to match your API response

## 🎯 Future Enhancements

### Planned Features
- **Real API Integration**: Connect to actual sales data sources
- **Advanced Analytics**: Trend analysis, forecasting, and comparative metrics
- **Export Functionality**: Download charts and data as PDF/Excel
- **Multi-tenant Support**: Support for multiple organizations
- **Advanced Filtering**: Date ranges, product categories, regional filters

### Technical Improvements
- **Caching**: Implement data caching for better performance
- **Offline Support**: Progressive Web App capabilities
- **Testing**: Comprehensive unit and integration tests
- **Accessibility**: Enhanced ARIA labels and keyboard navigation

## 📝 Development Notes

### Code Organization
- Components follow atomic design principles for maximum reusability
- TypeScript interfaces ensure type safety across the application
- Convex queries provide real-time data synchronization
- Tailwind CSS classes are organized using the `cn()` utility function

### Performance Considerations
- Charts are rendered using ResponsiveContainer for optimal sizing
- Data transformations are memoized using React.useMemo
- Convex queries are optimized with proper indexing

### Best Practices
- All components are fully typed with TypeScript
- Error boundaries handle chart rendering failures
- Loading states provide user feedback during data fetching
- Responsive design ensures cross-device compatibility

## 🤝 Contributing

This project demonstrates modern React development practices and can be extended with additional features. Key areas for contribution:
- Additional chart types and visualizations
- Enhanced filtering and search capabilities
- Real-time data streaming
- Advanced analytics and reporting features

## 📄 License

This project is created for demonstration purposes and showcases modern web development techniques using React, TypeScript, and Convex.
