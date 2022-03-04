import { Formatter, FormatterOnFinishOptions } from 'sherlock/formatters/formatter.ts';
import Observe from 'observe/Observe.ts';
import type { SiteResult } from 'sherlock/types.ts';
import { getSiteUserUrl } from 'sherlock/lib/fetcher.ts';

export type WebFormatterOptions = {
  showAll: boolean;
  exportFormat?: 'csv' | 'json';
};

export class WebFormatter extends Formatter {
  resultsObserve = new Observe<SiteResult | undefined>(undefined);
  exportObserve = new Observe<string | undefined>(undefined);

  constructor(private webFormatterOptions: WebFormatterOptions) {
    super({
      showAll: webFormatterOptions.showAll,
    });
  }

  onInit(): void {}
  onStart(): void {}

  onResult(siteResult: SiteResult): void {
    this.shouldShowResult(siteResult) && this.resultsObserve.setValue(siteResult);
  }

  onFinish(options: FormatterOnFinishOptions): void {
    let exportData;
    const { results } = options;
    const filteredResults = results.filter(result => this.shouldShowResult(result));

    if (this.webFormatterOptions.exportFormat === 'json') {
      exportData = JSON.stringify(filteredResults, null, 4);
    } else if (this.webFormatterOptions.exportFormat === 'csv') {
      exportData = '';
      for (const siteResult of filteredResults) {
        exportData += `${siteResult.siteName},"${getSiteUserUrl(siteResult.site, options.username)}",${siteResult.result}`;
      }
    }

    this.exportObserve.setValue(exportData);
  }
}
